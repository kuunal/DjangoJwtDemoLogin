response = {
    'NULL_USERNAME':{ 'status': 400, 'message':'Username cannot be null'},
    'NULL_EMAIL':{ 'status': 400, 'message':'Username cannot be null'},
    'NULL_PASSWORD':{ 'status': 400, 'message':'Username cannot be null'},
    'INVALID_USERNAME':{'status':400, 'message':'Username should not contain special charactes and blank spcaes!'},
    'INVALID_ID_PASS': {'status': 401, 'message': 'Invalid Id or pass! PLease try Again'},
    'LOGIN_SUCCESS':{'status': 200, 'message':'Login Successfull'},

}


def get_response_code(message):
    return response[message]