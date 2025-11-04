import random
from datetime import datetime, timedelta, timezone

def generate_otp_with_expiry(expiry_minutes=5):
    """
    Returns dict: { "otp": "123456", "expiry_time": datetime_obj (UTC) }
    """
    otp = f"{random.randint(0, 999999):06d}"
    expiry_time = datetime.now(timezone.utc) + timedelta(minutes=expiry_minutes)
    return {"otp": otp, "expiry_time": expiry_time}

def is_otp_expired(otp_expiry):
    if not otp_expiry:
        return True
    if otp_expiry.tzinfo is None:
        otp_expiry = otp_expiry.replace(tzinfo=timezone.utc)
    return datetime.now(timezone.utc) > otp_expiry
