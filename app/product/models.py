from django.db import models, connection
import math


def get_query_and_params(func):
    def wrapper(page, last_item_info=None, sortby="id", PAGINATOR_ITEMS=8):
        allowed_values = ['id', 'price', 'author',
                          'title', 'quantity', 'price']
        if sortby and (sortby in allowed_values):
            if last_item_info:
                query = f'select SQL_CALC_FOUND_ROWS id, author, title, image, quantity, price, description from product where {sortby} > %s order by {sortby} limit %s'
                params = (last_item_info, PAGINATOR_ITEMS)
                return func(page, sortby, last_item_info, query, params, PAGINATOR_ITEMS)
            return func(page, sortby, PAGINATOR_ITEMS)
    return wrapper


class ProductManager():

    @staticmethod
    @get_query_and_params
    def all(page, sortby, last_item_info=None, query="", params="", PAGINATOR_ITEMS=8):
        query = query if query else f'select id, author, title, image, quantity, price, description from product order by {sortby} limit %s,%s;'
        params = params if params else (
            (int(page)*PAGINATOR_ITEMS)-PAGINATOR_ITEMS, PAGINATOR_ITEMS)
        try:
            cursor = connection.cursor()
            cursor.execute(query, params)
            rows = cursor.fetchall()
            objects = []
            if rows:
                for row in rows:
                    product_object = Product()
                    [product_object.id, product_object.author, product_object.title, product_object.image,
                        product_object.quantity, product_object.price, product_object.description] = row
                    objects.append(product_object)
            return objects
        finally:
            cursor.close()


class Product:
    objects = ProductManager()

    def __init__(self):
        self.id = None
        self.author = None
        self.title = None
        self.image = None
        self.price = None
        self.quantity = None
        self.description = None


# 'select id, author, title, image, quantity, price, description, (select count(id) from product) as length from product where id > %s order by %s limit %s', ((int(page)*PAGINATOR_ITEMS)-PAGINATOR_ITEMS, sortby, PAGINATOR_ITEMS))select id, author, title, image, quantity, price, description from product where %s > %s order by %s limit %s;"
