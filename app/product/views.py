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
import math
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
            response = func(request, *args, **kwargs)
            if response.status_code == 200:
                products = pickle.dumps(response.data)
                redis_instance.set(page, products)
            return response
    return wrapper


def authenticate(func):
    def jwt_decode(request, *args, **kwargs):
        token = request.headers.get('x_token')
        try:
            payload = jwt.decode(token, settings.SECRET_KEY)
            user_email = payload.get('user_id')
            return func(request)
        except (jwt.DecodeError, jwt.ExpiredSignatureError):
            return custom_token_refresh_view(request._request, *args, **kwargs)
    return jwt_decode


@api_view(('GET',))
@authenticate
# @caching
def get_products(request):
    try:
        page = request.GET['pageno']
        products = Product.objects.all(page)
        total_products = products[0].total_products
        total_page = math.ceil(total_products/8)
        if products:
            serializer = ProductSerializer(products, many=True)
            response = getPaginationResponse(
                serializer.data, total_page, page, total_products)
            return Response(response, status=200)
        return Response(status=404)
    except KeyError:
        return Response(status=404)


def getPaginationResponse(products, total_page, current_page, total_products, start_page=1):
    next_page = ""
    prev_page = ""
    if int(current_page) < total_page:
        next_page = f'{settings.PRODUCT_API}{str(int(current_page)+1)}'
    if int(current_page) > start_page:
        prev_page = settings.PRODUCT_API+str(int(current_page)-1)
    return {"products": products, "next_page": next_page.replace(" ", ""), "prev_page": prev_page.replace(" ", ""), "total_page": total_page, "total_products": total_products}
