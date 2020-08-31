from django.urls import path, include
from .views import LoginView, custom_token_refresh_view

urlpatterns=[
    path('', LoginView.as_view(), name="login"),
    path('refresh/', custom_token_refresh_view)
]
