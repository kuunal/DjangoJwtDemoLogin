response = {
    'NULL_USERNAME':{ 'status': 400, 'message':'Username cannot be null'},
    'NULL_EMAIL':{ 'status': 400, 'message':'Username cannot be null'},
    'NULL_PASSWORD':{ 'status': 400, 'message':'Username cannot be null'},
    'INVALID_USERNAME':{'status':400, 'message':'Username should not contain special charactes and blank spcaes!'}
}


def get_response_code(message):
    return response[message]