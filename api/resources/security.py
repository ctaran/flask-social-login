from models.user import UserModel

from flask_restful import Resource
from flask import jsonify, request
from flask_jwt_extended import create_access_token

class Security(Resource):

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
                    'role': user.role
                })
        else:
            return {"msg": "Bad username or password"}, 401