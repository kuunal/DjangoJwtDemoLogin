from django.shortcuts import render
from .serializers import RegisterSerializer
from rest_framework.response import Response
from rest_framework import generics 
from app.login_exception import LoginError
# Create your views here.

class RegisterView(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if not serializer.is_valid():
            return LoginError({'status':400,'message':serializer.errors})
        serializer.save()
        user_data = serializerdata
        return Response(user_data, status=status.HTTP_201_CREATED)
