from rest_framework import serializers
from .models import User
from app.login_exception import LoginError
from response_codes import get_response_code

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=255, min_length=8, write_only=True)

    class Meta:
        model = User
        fields = ['username','email','password']

    def validate_username(self, username):
        if not username.isalnum():
            raise LoginError(get_response_code('INVALID_USERNAME'))