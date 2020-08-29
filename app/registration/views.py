from django.shortcuts import render
from .serializers import RegisterSerializer
from rest_framework.response import Response
from rest_framework import generics 
from app.login_exception import LoginError
from rest_framework.exceptions import AuthenticationFailed, APIException
from response_codes import get_response_code
# Create your views here.

class RegisterView(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if not serializer.is_valid():
            raise LoginError(**{'status':400, 'message':serializer.errors})
        serializer.save()
        user_data = serializer.data
        return Response(user_data, status=201)
