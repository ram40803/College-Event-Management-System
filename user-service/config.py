import os
from flask import Flask
from flask_pymongo import PyMongo
from dotenv import load_dotenv

load_dotenv()

# config.py
import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

class Config:
    MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/user_db")
    SECRET_KEY = os.getenv("SECRET_KEY", "change_this_secret")
    OTP_EXPIRY_MINUTES = int(os.getenv("OTP_EXPIRY_MINUTES", "5"))
    SERVICE_NAME = os.getenv("SERVICE_NAME", "user-service")
    SERVICE_PORT = int(os.getenv("SERVICE_PORT", 5001))
    HOST = os.getenv("HOST", "localhost")
    EUREKA_SERVER = os.getenv("EUREKA_SERVER", "http://localhost:8761/eureka")


def create_app():
    app = Flask(__name__)

    app.config["MONGO_URI"] = Config.MONGO_URI
    app.config["SECRET_KEY"] = Config.SECRET_KEY
    app.config["OTP_EXPIRY_MINUTES"] = Config.OTP_EXPIRY_MINUTES
    # Initialize PyMongo and attach db to app for easy import access
    mongo = PyMongo(app)
    app.mongo = mongo.db

    # Register blueprints
    from routes.auth_routes import auth_bp
    app.register_blueprint(auth_bp, url_prefix="/users")

    # Health endpoints
    @app.route("/health")
    def health():
        return {"status": "UP"}, 200

    @app.route("/info")
    def info():
        return {
            "service": Config.SERVICE_NAME,
            "port": Config.SERVICE_PORT
        }, 200

    return app
