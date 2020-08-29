from django.db import models
from django.contrib.auth.models import (AbstractBaseUser, PermissionsMixin, BaseUserManager)
from app.login_exception import LoginError
from response_codes import get_response_code

# Create your models here.

class UserManager(BaseUserManager):

    def create_user(self, username, email, password):
        if username is None:
            raise LoginError(**get_response_code('NULL_USERNAME'))
        if email is None:
            raise LoginError(**get_response_code('NULL_EMAIL'))
        if password is None:
            raise LoginError(**get_response_code('NULL_PASSWORD'))

        user = self.model(username=username,
                            email=self.normalize_email(email))
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, email, password):
        if username is None:
            raise LoginError(**get_response_code('NULL_USERNAME'))
        if email is None:
            raise LoginError(**get_response_code('NULL_EMAIL'))
        if password is None:
            raise LoginError(**get_response_code('NULL_PASSWORD'))

        user = self.create_user(username=username,
                            email=email, password=password)
        user.is_superuser=True
        user.is_staff=True
        user.save()
        return user

class User(AbstractBaseUser, PermissionsMixin):
    username =  models.CharField(max_length=255)
    email = models.EmailField(max_length=255, db_index=True, unique=True)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username','password',]

    objects = UserManager()

    def __str__(self):
        return self.email

    def tokens(self):
        pass

