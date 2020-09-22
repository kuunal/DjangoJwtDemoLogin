from django.shortcuts import render
from django.db import connection as cn
from .serializers import ProductSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Product
from app.redis_setup import get_redis_instance
import pickle
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

@api_view(('GET',))
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


