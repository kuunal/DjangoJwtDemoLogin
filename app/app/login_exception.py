from rest_framework.views import exception_handler
from rest_framework.exceptions import APIException


class LoginError(APIException):

    def __init__(self, **kwargs):
        self.status_code = kwargs['status']
        self.detail = kwargs['message']


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None:
        response.data['status_code'] = response.status_code

    return response
