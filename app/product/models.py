from django.db import models, connection
import math


class ProductManager():
    @staticmethod
    def all(page, sortby):
        PAGINATOR_ITEMS = 8
        try:
            cursor = connection.cursor()
            cursor.execute(
                f'select SQL_CALC_FOUND_ROWS id, author, title, image, quantity, price, description from product order by {sortby} limit %s,%s;', ((int(page)*PAGINATOR_ITEMS)-PAGINATOR_ITEMS, PAGINATOR_ITEMS))
            rows = cursor.fetchall()
            cursor.execute("select found_rows()")
            total_products = cursor.fetchone()
            objects = []
            if rows:
                for row in rows:
                    product_object = Product()
                    product_object.id = row[0]
                    product_object.author = row[1]
                    product_object.title = row[2]
                    product_object.image = row[3]
                    product_object.quantity = row[4]
                    product_object.price = row[5]
                    product_object.description = row[6]
                    objects.append(product_object)
            return objects, total_products
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
