from models.user import UserModel
from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity

class User(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('name', 
        type=str,
        required=True,
        help="Name field cannot be left blank!"
    )
    parser.add_argument('password', 
        type=str,
        required=True,
        help="Password field cannot be left blank!"
    )
    parser.add_argument('email', 
    type=str,
    required=True,
    help="Email field cannot be left blank!"
    )
    parser.add_argument('role', 
        type=str,
        required=True,
        help="Role field cannot be left blank!"
    )

    @jwt_required   
    def get(self, name):
        user = UserModel.find_by_name(name)
        if user:
            return user.json()
        return {'message':'user not found'}, 404

    def post(self):
        data = User.parser.parse_args()
        user = None

        name = data['name']

        if UserModel.find_by_name(name):
            return {"message": "User {} already exists".format(name)}, 400

        password = data['password']
        email = data['email']
        role = data['role']

        user = UserModel(name, email, role, password=password)

        try:
            user.save_to_db()
        except Exception as err:
            return {"message": "An error occurred creating the user - {}".format(err)}, 500

        return user.json(), 201

    @jwt_required
    def delete(self, name):
        user = UserModel.find_by_name(name)

        if user:
            try:
                user.delete_from_db()
                return {'message':'User deleted'}
            except Exception as err:
                return {"message": "An error occurred deleting the user - {}".format(err)}, 500

        return {'message':'No user with name - {} - exists'.format(name)}, 404

    @jwt_required 
    def put(self, name):
        data = User.parser.parse_args()
        user = UserModel.find_by_name(name)

        if user:
            user.name = data['name']
            if data['password']:
                user.password = UserModel.generate_hash(data['password'])
            user.email = data['email']
            if data['role']:
                user.role = data['role']
        else:
            user = UserModel(data['name'], data['email'], data['role'], password=data['password'])
            
        try:
            user.save_to_db()
        except:
            return {"message": "An error occurred updating the user"}, 500
        
        return user.json()

class UserList(Resource):

    @jwt_required
    def get(self):
        return {"users": [user.json() for user in UserModel.get_all_users()]}