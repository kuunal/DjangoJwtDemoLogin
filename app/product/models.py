from django.db import models, connection


class ProductManager():
    @staticmethod
    def all(page):
        PAGINATOR_ITEMS = 8
        try:
            cursor = connection.cursor()
            cursor.execute(
                'select id, author, title, image, quantity, price, description, (select count(id) from product) as length from product where id > %s limit %s', ((int(PAGINATOR_ITEMS)*8)-8, PAGINATOR_ITEMS))
            rows = cursor.fetchall()
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
                    product_object.total_products = row[7]
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
        self.total_products = None
