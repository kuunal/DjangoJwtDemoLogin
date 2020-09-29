from django.shortcuts import render
from django.db import connection as cn
from .serializers import ProductSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Product
from rest_framework.exceptions import AuthenticationFailed
from app.redis_setup import get_redis_instance
import pickle
import jwt
from login.views import custom_token_refresh_view
from app import settings
# Create your views here.


def caching(func):
    def wrapper(request, *args, **kwargs):
        redis_instance = get_redis_instance()
        page = request.GET['pageno']
        products = redis_instance.get(page)
        if products:
            products = pickle.loads(products)
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data)
        else:
            response =  func(request, *args, **kwargs)
            if response.status_code == 200:
                products = pickle.dumps(response.data)
                redis_instance.set(page, products)
            return response
    return wrapper

def authenticate(func):
    def jwt_decode(request):
        token = request.headers.get('x-token')
        print(token,"sadsadsadsa")
        if not token:
            raise AuthenticationFailed("no token")  
        try:
            payload = jwt.decode(token, settings.SECRET_KEY)
            user_email=payload.get('user_id')
            return func(request)
        except (jwt.DecodeError) :   
            return custom_token_refresh_view(request)
        # except  as indentifier:
        #     raise AuthenticationFailed("expired")  
    return jwt_decode 


@api_view(('GET',))
@authenticate
@caching
def get_products(request):
    try:
        redis_instance = get_redis_instance()
        page = request.GET['pageno']
        cursor = cn.cursor()
        products = Product.objects.all(page)
        if products:
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data, status=200)
        return Response(status=404)
    except KeyError:
        return Response(status=404)


