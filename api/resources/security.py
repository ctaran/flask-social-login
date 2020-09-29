import requests
from models.user import UserModel, UserOrigin, UserRole

from flask_restful import Resource, reqparse
from flask import jsonify, request
from flask_jwt_extended import create_access_token

from google.oauth2 import id_token
from google.auth.transport import requests as grequests

class Login(Resource):

    def post(self):
        if not request.is_json:
            return {"msg": "Missing JSON in request"}, 400

        username = request.json.get('username', None)
        password = request.json.get('password', None)
        if not username:
            return {"msg": "Missing username parameter"}, 400
        if not password:
            return {"msg": "Missing password parameter"}, 400

        user = UserModel.find_by_name(username) or UserModel.find_by_email(username)
        if user and UserModel.verify_hash(password, user.password):
            access_token = create_access_token(identity=username)
            return jsonify({
                    'access_token': access_token,
                    'id': user.id,
                    'name': user.name,
                    'email': user.email,
                    'role': user.role,
                    'origin': user.origin
                })
        else:
            return {"msg": "Bad username or password"}, 401

class LoginExternal(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('access_token', 
        type=str,
        required=True,
        help="Access Token field cannot be left blank!"
    )
    parser.add_argument('origin', 
        type=str,
        required=True,
        help="Origin field cannot be left blank!"
    )

    def post(self):
        data = LoginExternal.parser.parse_args()

        origin = data['origin']
        # Verify token
        if origin != UserOrigin.GOOGLE.name:
            return {'message':'Origin {} unrecognized'.format(origin)}, 404
    
        # Get User details from the Google specific Payload
        CLIENT_ID = "133413789921-krktqeelao35acttdqqd0gp0sp6q56kp.apps.googleusercontent.com"
        idinfo = id_token.verify_oauth2_token(data['access_token'], grequests.Request(), CLIENT_ID)

        name = idinfo['given_name'] + " " + idinfo['family_name']
        email = idinfo['email']
        user = UserModel.find_by_email(email)

        if not user:
            try:
                user = UserModel(name, email, UserRole.USER.name, origin )
                user.save_to_db()
            except Exception as err:
                return {"message": "An error occurred creating the user - {}".format(err)}, 500        

        access_token = create_access_token(identity=user.id)

        # return Identity
        return jsonify({
                    'access_token': access_token,
                    'id': user.id,
                    'name': user.name,
                    'email': user.email,
                    'role': user.role,
                    'origin': user.origin
                })

