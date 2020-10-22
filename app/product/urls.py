from django.urls import path
from .views import get_products, type_ahead_search

urlpatterns = [
    path('', get_products),
    path('search', type_ahead_search)
]
