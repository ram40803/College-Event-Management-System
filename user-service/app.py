# user-service/app.py
from flask import Flask, request, jsonify
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
import os
from dotenv import load_dotenv
import httpx
import py_eureka_client.eureka_client as eureka_client
import socket

# Load environment variables (like the MongoDB URI)
load_dotenv()

app = Flask(__name__)

# --- Database Setup (MongoDB) ---
MONGO_URI = os.environ.get("MONGO_URI", "mongodb://host.docker.internal:27017/") # Use default for local Docker
client = MongoClient(MONGO_URI)
db = client.user_db  # The database name for this service
users_collection = db.users # The collection (table) for users

# --- Utility Functions ---
def user_helper(user) -> dict:
    """Converts MongoDB document to a Python dictionary, handling the '_id' field."""
    return {
        "id": str(user["_id"]),
        "email": user["email"],
        "password_hash": user["password_hash"],
        "full_name": user.get("full_name"),
        "role": user.get("role", "student") # Default role
    }

# --- API Endpoints ---

@app.route("/users/register", methods=["POST"])
def register_user():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    full_name = data.get("full_name")
    
    # 1. Basic validation
    if not email or not password:
        return jsonify({"error": "Missing email or password"}), 400

    # 2. Check if user already exists
    if users_collection.find_one({"email": email}):
        return jsonify({"error": "User already exists"}), 409

    # 3. Hash password and insert
    hashed_password = generate_password_hash(password, method='scrypt')
    user_data = {
        "email": email,
        "password_hash": hashed_password,
        "full_name": full_name,
        "role": data.get("role", "student")
    }
    
    result = users_collection.insert_one(user_data)
    
    return jsonify({"message": "User registered successfully", "user_id": str(result.inserted_id)}), 201

@app.route("/users/<id>", methods=["GET"])
def get_user(id):
    from bson.objectid import ObjectId # Import here to avoid circular dependency issues
    try:
        user = users_collection.find_one({"_id": ObjectId(id)})
    except:
        return jsonify({"error": "Invalid ID format"}), 400

    if user:
        return jsonify(user_helper(user)), 200
    return jsonify({"error": "User not found"}), 404


userServicPort = 5000

eureka_client.init(
    eureka_server="http://service-registry:8761/eureka/",
    app_name="user-service",
    instance_port=userServicPort,
    instance_ip= socket.gethostbyname(socket.gethostname())
)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=userServicPort)