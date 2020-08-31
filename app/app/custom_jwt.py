
import datetime
from _datetime import timedelta
from django.utils import timezone
from app import settings
import jwt

def generate_custom_token(user_id, expiry_time, token_type):
    token = jwt.encode({'user_id':user_id, 
                        'exp': timezone.now() + timedelta(seconds=expiry_time),
                        'token_type': token_type.lower()},
                        settings.SECRET_KEY)
    return token.decode('utf-8')
