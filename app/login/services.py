import jwt
from app.login_exception import LoginError
from app import settings
from response_codes import get_response_code
from django.db import connection as cn

def refresh_token_required(func):
    def wrapper(request, user=None, *args, **kwargs):
        token = request.headers.get('refresh-token') 
        if not token:
            raise LoginError(**get_response_code('TOKEN_NOT_FOUND'))
        try:
            cursor = cn.cursor()
            payload = jwt.decode(token, settings.SECRET_KEY)
            user_id = payload.get('user_id')
            token_type = payload.get('token_type')
            if token_type != "refresh":
                raise LoginError(**get_response_code('INVALID_TOKEN'))
            user_count = cursor.execute('select exists(select id from login_loginmodel where user_id_id = %s)',(user_id,))
            if not user_count:
                raise LoginError(**get_response_code('LOGIN_REQUIRED'))
            return func(request, user=user_id, *args, **kwargs )
        except jwt.DecodeError:
            raise LoginError(**get_response_code('INVALID_TOKEN'))
        except jwt.ExpiredSignatureError:
            raise LoginError(**get_response_code('TOKEN_EXPIRED'))
        finally:
            cursor.close()
    return wrapper




