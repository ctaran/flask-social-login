from models.user import UserOrigin, UserRole
from flask import json
from tests.basecase import BaseCase

class TestLogin(BaseCase):

    def test_successful_login(self):
        """Test that user login works correctly."""
        user_data = {
            "name":"test",
            "password":"test",
            "email":"test@gmail.com",
            "role": UserRole.USER,
            "origin": UserOrigin.INTERNAL
        }
        user_creds = {
            "username":"test",
            "password":"test"
        }

        # register user
        res = self.client.post('/api/user/new', data=user_data)
        result = json.loads(res.data.decode())
        # login
        res = self.client.post('/api/login', headers={"Content-Type": "application/json"}, json=user_creds)
        result = json.loads(res.data.decode())

        self.assertEqual(str, type(result['access_token']))
        self.assertNotEqual(None, result['access_token'])
        self.assertEqual(res.status_code, 200)

    def test_login_wrong_username(self):
        """Test that user login fails when wrong username is provided."""
        
        user_data = {
            "name":"test",
            "password":"test",
            "email":"test@gmail.com",
            "role": UserRole.USER,
            "origin": UserOrigin.INTERNAL
        }
        user_creds = {
            "username":"wrong_user",
            "password":"test"
        }

        # register user
        res = self.client.post('/api/user/new', data=user_data)
        result = json.loads(res.data.decode())
        # login
        res = self.client.post('/api/login', headers={"Content-Type": "application/json"}, json=user_creds)
        result = json.loads(res.data.decode())

        self.assertEqual(result['msg'], "Bad username or password")
        self.assertEqual(res.status_code, 401)

    def test_login_wrong_password(self):
        """Test that user login fails when wrong password is provided."""
        
        user_data = {
            "name":"test",
            "password":"test",
            "email":"test@gmail.com",
            "role": UserRole.USER,
            "origin": UserOrigin.INTERNAL
        }
        user_creds = {
            "username":"test",
            "password":"wrong_pwd"
        }

        # register user
        res = self.client.post('/api/user/new', data=user_data)
        result = json.loads(res.data.decode())
        # login
        res = self.client.post('/api/login', headers={"Content-Type": "application/json"}, json=user_creds)
        result = json.loads(res.data.decode())

        self.assertEqual(result['msg'], "Bad username or password")
        self.assertEqual(res.status_code, 401)