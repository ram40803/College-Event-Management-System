from flask import Blueprint, request, jsonify, current_app
from datetime import datetime, timezone
from bson import ObjectId
import bcrypt
import jwt
import re

from utils.otp_utils import generate_otp_with_expiry, is_otp_expired
from utils.kafka_producer import send_otp_email

auth_bp = Blueprint("auth_bp", __name__)

# Helpers to access db
def users_collection():
    return current_app.mongo.users

# Helpers to valided emil
def is_valid_email(email):
    regex = r'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    return re.match(regex, email)

# ---------------- REGISTER ----------------
@auth_bp.route("/register", methods=["POST"])
def register_user():
    data = request.get_json() or {}
    email = data.get("email")
    name = data.get("name")
    password = data.get("password")

    if not (email and name and password):
        return jsonify({"error": "name, email and password are required"}), 400
    
    if not is_valid_email(email):
        return jsonify({"error": "Invalid email format"}), 400

    # check existing user
    existing = users_collection().find_one({"email": email})
    if existing:
        if existing.get("is_verified"):
            return jsonify({"message": "Email already registered and verified"}), 400
        else:
            # user exists but not verified -> resend OTP (update)
            otp_data = generate_otp_with_expiry(current_app.config["OTP_EXPIRY_MINUTES"])
            users_collection().update_one(
                {"email": email},
                {"$set": {"otp": otp_data["otp"], "otp_expiry": otp_data["expiry_time"], "name": name}}
            )
            send_otp_email(email, otp_data["otp"], name=name)
            return jsonify({"message": "User exists but not verified. OTP resent."}), 200

    # create new user (not verified yet)
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode("utf-8"), salt).decode("utf-8")

    otp_data = generate_otp_with_expiry(current_app.config["OTP_EXPIRY_MINUTES"])

    user_doc = {
        "name": name,
        "email": email,
        "password": hashed,
        "role": "student",
        "is_verified": False,
        "otp": otp_data["otp"],
        "otp_expiry": otp_data["expiry_time"],
        "created_at": datetime.now(timezone.utc)
    }

    users_collection().insert_one(user_doc)
    send_otp_email(email, otp_data["otp"], name=name)

    return jsonify({"message": "Registered successfully. OTP sent to email."}), 201


# ---------------- VERIFY OTP ----------------
@auth_bp.route("/verify-otp", methods=["POST"])
def verify_otp():
    data = request.get_json() or {}
    email = data.get("email")
    otp = data.get("otp")

    if not (email and otp):
        return jsonify({"error": "email and otp are required"}), 400

    user = users_collection().find_one({"email": email})
    if not user:
        return jsonify({"error": "User not found"}), 404

    if user.get("is_verified"):
        return jsonify({"message": "User already verified"}), 200

    if is_otp_expired(user.get("otp_expiry")):
        return jsonify({"error": "OTP expired"}), 400

    if otp != user.get("otp"):
        return jsonify({"error": "Invalid OTP"}), 400

    # mark verified and remove otp fields
    users_collection().update_one(
        {"email": email},
        {"$set": {"is_verified": True}, "$unset": {"otp": "", "otp_expiry": ""}}
    )
    return jsonify({"message": "Email verified successfully"}), 200


# ---------------- RESEND OTP ----------------
@auth_bp.route("/resend-otp", methods=["POST"])
def resend_otp():
    data = request.get_json() or {}
    email = data.get("email")

    if not email:
        return jsonify({"error": "email is required"}), 400

    user = users_collection().find_one({"email": email})
    if not user:
        return jsonify({"error": "User not found"}), 404

    if user.get("is_verified"):
        return jsonify({"message": "User already verified"}), 400

    otp_data = generate_otp_with_expiry(current_app.config["OTP_EXPIRY_MINUTES"])
    users_collection().update_one(
        {"email": email},
        {"$set": {"otp": otp_data["otp"], "otp_expiry": otp_data["expiry_time"]}}
    )
    send_otp_email(email, otp_data["otp"], name=user.get("name"))
    return jsonify({"message": "OTP resent successfully"}), 200


# ---------------- LOGIN ----------------
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email = data.get("email")
    password = data.get("password")

    if not (email and password):
        return jsonify({"error": "email and password are required"}), 400

    user = users_collection().find_one({"email": email})
    if not user:
        return jsonify({"error": "User not found"}), 404

    if not user.get("is_verified"):
        return jsonify({"error": "Please verify your email before login"}), 403

    stored_pw = user.get("password")
    if not stored_pw or not bcrypt.checkpw(password.encode("utf-8"), stored_pw.encode("utf-8")):
        return jsonify({"error": "Invalid credentials"}), 401

    # Create JWT token
    payload = {
        "user_id": str(user.get("_id")),
        "email": user.get("email")
    }
    token = jwt.encode(payload, current_app.config["SECRET_KEY"], algorithm="HS256")
    return jsonify({
        "message": "Login successful",
        "token": token,
        "user": {"name": user.get("name"), "email": user.get("email")}
    }), 200

# ------------------ Find User -------------------
@auth_bp.route('/<user_id>', methods=['GET'])
def get_user_by_id(user_id):
    """
    Get user details by MongoDB ObjectId.
    """
    try:
        user = users_collection().find_one({"_id": ObjectId(user_id)}, {"password": 0, "otp": 0, "otp_expiry": 0})
        if not user:
            return jsonify({"error": "User not found"}), 404

        # Convert ObjectId to string for JSON
        user["_id"] = str(user["_id"])
        return jsonify(user), 200

    except Exception as e:
        return jsonify({"error": f"Invalid user ID: {str(e)}"}), 400
