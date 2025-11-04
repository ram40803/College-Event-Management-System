import os
import requests

# NOTIFICATION_URL = os.getenv("NOTIFICATION_URL", "http://notification-service:5003/notify")

def send_otp_email(email, otp, name=None):
    print("otp: ",otp)
    # payload = {
    #     "email": email,
    #     "subject": "Your OTP Verification Code",
    #     "message": f"Hello{(' ' + name) if name else ''},\n\nYour OTP code is: {otp}\nIt will expire in a few minutes.\n\nIf you didn't request this, ignore this email."
    # }
    # try:
    #     # Notification service expects this shape - change as per your notification service contract
    #     resp = requests.post(NOTIFICATION_URL, json=payload, timeout=5)
    #     resp.raise_for_status()
    #     return True
    # except Exception as e:
    #     # log in production (here we print for simplicity)
    #     print("Error calling Notification Service:", e)
    #     return False
