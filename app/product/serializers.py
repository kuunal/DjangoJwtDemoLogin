from rest_framework import serializers


class ProductSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    author = serializers.CharField(max_length=255)
    title = serializers.CharField(max_length=255)
    image = serializers.CharField(max_length=255)
    quantity = serializers.IntegerField()
    price = serializers.IntegerField()
    description = serializers.CharField(max_length=255)
    # total_products = serializers.IntegerField()
