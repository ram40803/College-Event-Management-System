import os
from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config["MONGO_URI"] = os.getenv("MONGO_URI", "mongodb://localhost:27017/user_db")
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "change_this_secret")
    app.config["OTP_EXPIRY_MINUTES"] = int(os.getenv("OTP_EXPIRY_MINUTES", "5"))
    # Initialize PyMongo and attach db to app for easy import access
    mongo = PyMongo(app)
    app.mongo = mongo.db

    # Register blueprints
    from routes.auth_routes import auth_bp
    app.register_blueprint(auth_bp, url_prefix="/users")

    return app
