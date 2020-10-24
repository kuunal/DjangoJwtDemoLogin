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
from app.db import execute_sql
from django.db import connection
from app.es import es
import asyncio
from asgiref.sync import sync_to_async
# Create your views here.
from elasticsearch import AsyncElasticsearch


@sync_to_async
def add_to_cache(redis_instance, response, sortby, page):
    if response.status_code == 200:
        products = pickle.dumps(response.data)
        redis_instance.set(sortby, products)


def caching(func):
    def wrapper(request, *args, **kwargs):
        redis_instance = get_redis_instance()
        page = request.GET['pageno']
        sortby = request.GET.get('sortby', "id")
        products = redis_instance.get(page)
        if products and page == 1:
            products = pickle.loads(products)
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data)
        else:
            response = func(request, *args, **kwargs)
            asyncio.run(add_to_cache(redis_instance, response, sortby, page))
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
@caching
def get_products(request):
    try:
        page = request.GET['pageno']
        last_item_info = request.GET.get('last_item_info', None)
        sortby = request.GET.get('sortby', "id")
        pagination_item_count = int(request.GET.get("itemCount", 8))
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
        products = asyncio.run(Product.objects.all(
            page,  last_item_info=last_item_info, sortby=sortby, PAGINATOR_ITEMS=pagination_item_count))
        if products:
            serializer = ProductSerializer(products, many=True)
            total_product = execute_sql(
                'select max(id) from product order by id desc limit 1;', many=False)
            total_page = math.ceil(total_product/pagination_item_count)
            return Response({"products": serializer.data, 'total_products': total_product, 'total_page': total_page}, status=200)
        return Response(status=404)
    except KeyError:
        return Response(status=404)


@api_view(("GET",))
def type_ahead_search(request):
    try:
        es = AsyncElasticsearch()
        value = request.GET['query']
        body = {
            "query": {
                "match_phrase_prefix": {
                    "title": value
                }
            }
        }
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
        res = asyncio.run(es.search(body, "bookstore"))
        return Response(res['hits']['hits'])
    finally:
        asyncio.run(es.close())
