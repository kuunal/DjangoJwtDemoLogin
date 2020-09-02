from django.db import models, connection
class ProductManager():
    @staticmethod
    def all(page):
        try:
            cursor = connection.cursor()
            cursor.execute('select id, author, title, image, quantity, price, description from product where id >= %s limit 5', ((int(page)*5)-5,))
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