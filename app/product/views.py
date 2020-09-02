from django.shortcuts import render
from django.db import connection as cn
from .serializers import ProductSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Product
# Create your views here.


@api_view(('GET',))
def get_products(request):
    try:
        page = request.GET['pageno']
        cursor = cn.cursor()
        products = Product.objects.all(page)
        if products:
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data)
        return Response(404)
    except KeyError:
        return Response(404)
