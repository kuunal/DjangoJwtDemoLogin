from rest_framework.response import Response
from .redis_setup import get_redis_instance
import pickle
from django.http import JsonResponse
from product.serializers import ProductSerializer

def CacheMiddleware(get_response):
    def wrapper(request, *args, **kwargs):
        redis_instance = get_redis_instance()
        page = request.GET['pageno']
        products = redis_instance.get(page)
        if products:
            print("from middleware", request.GET['pageno'])
            products = pickle.loads(products)
            serializer = ProductSerializer(products, many=True)
            return JsonResponse(serializer.data, safe=False)
        response = get_response(request)
        return response
    return wrapper

# class CacheMiddleware:
    
#     def __init__(self, get_response):
#         self.get_response = get_response
    
#     def __call__(self, request):
#         response = self.get_response(request)
#         return response
    
#     def process_view(self, request, *args, **kwargs):
#         redis_instance = get_redis_instance()
#         page = request.GET['pageno']
#         products = redis_instance.get(page)
#         if products:
#             print("from middleware", request.GET['pageno'])
#             products = pickle.loads(products)
#             serializer = ProductSerializer(products, many=True)
#             return JsonResponse({'data':serializer.data})
#         return None
            