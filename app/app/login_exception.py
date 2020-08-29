from rest_framework.exceptions import APIException

class LoginError(APIException):
    status = None
    detail = None 