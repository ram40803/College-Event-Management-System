from kafka import KafkaProducer
import json
import os
from dotenv import load_dotenv

load_dotenv()

KAFKA_BROKER = os.getenv("KAFKA_BROKER")
KAFKA_TOPIC = os.getenv("KAFKA_TOPIC")

# Initialize producer
producer = KafkaProducer(
    bootstrap_servers=[KAFKA_BROKER],
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

def send_notification_event(email, subject, message):
    """Publish notification message to Kafka topic"""
    event_data = {
        "email": email,
        "subject": subject,
        "message": message
    }
    producer.send(KAFKA_TOPIC, event_data)
    producer.flush()
    print(f"📤 Sent event to Kafka: {event_data}")

def send_otp_email(email, otp, name=None):
    otp_data = {
        email,
        "Your OTP Verification Code",
        f"Hello{(' ' + name) if name else ''},\n\nYour OTP code is: {otp}\nIt will expire in a few minutes.\n\nIf you didn't request this, ignore this email."
    }
    producer.send(KAFKA_BROKER, otp_data)
    producer.flush()
    print(f"📤 Send otp to kafka: {otp_data}")
    
