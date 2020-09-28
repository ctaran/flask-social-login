from resources.security import Login, LoginExternal
from resources.user import User, UserList

def initialize_routes(api):

    api.add_resource(User, '/api/user/<string:name>', '/api/user/new')
    api.add_resource(UserList, '/api/users')
    api.add_resource(Login, '/api/login')
    api.add_resource(LoginExternal, '/api/external/login')