from django.db import models
from registration.models import User

# Create your models here.
class LoginModel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    refresh_token = models.CharField(max_length=255)


