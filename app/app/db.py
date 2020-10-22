from django.db import connection
from .login_exception import LoginError
from django.db import IntegrityError
from django.core.exceptions import ValidationError
from django.db import models, connection
from django.db import DatabaseError, IntegrityError, ProgrammingError


def execute_sql(query, params=None, many=None):
    try:
        cursor = connection.cursor()
        res = cursor.execute(query, params)
        if many == True:
            result = cursor.fetchall()
            return result if result else None
        if many == False:
            result = cursor.fetchone()
            return result[0] if result else None
        return res
    except ProgrammingError:
        raise LoginError(status_code=400, detail="Query is wrong")
    except IntegrityError:
        raise LoginError(status_code=400, detail="Referencial error")
    except DatabaseError:
        raise LoginError(status_code=400, detail="Table doesnt exist")

    finally:
        cursor.close()
