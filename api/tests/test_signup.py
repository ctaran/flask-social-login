from models.user import UserOrigin, UserRole
from flask import json

from tests.basecase import BaseCase

class TestSignUp(BaseCase):

    def test_successful_signup(self):
        """Test user registration works correcty."""
        user_data = {
            "name":"test",
            "password":"test",
            "email":"test@gmail.com",
            "role": UserRole.ADMIN,
            "origin": UserOrigin.INTERNAL
        }

        res = self.client.post('/api/user/new', data=user_data)
        result = json.loads(res.data.decode())

        self.assertEqual(result['name'], user_data['name'])
        self.assertNotEqual(None, result['id'])
        self.assertEqual(res.status_code, 201)

    def test_signup_without_username(self):
        """Test user registration fails if Name is not specified."""
        user_data = {
            "password":"test",
            "email":"test@gmail.com",
            "role": UserRole.ADMIN,
            "origin": UserOrigin.INTERNAL
        }

        res = self.client.post('/api/user/new', data=user_data)
        result = json.loads(res.data.decode())
        self.assertEqual(
            result['message'], {'name': 'Name field cannot be left blank!'})
        self.assertEqual(res.status_code, 400)

    def test_signup_without_password(self):
        """Test user registration fails if Password is not specified."""
        user_data = {
            "name":"test",
            "email":"test@gmail.com",
            "role": UserRole.ADMIN,
            "origin": UserOrigin.INTERNAL
        }

        res = self.client.post('/api/user/new', data=user_data)
        result = json.loads(res.data.decode())
        self.assertEqual(
            result['message'], {"password": "Password field cannot be left blank!"})
        self.assertEqual(res.status_code, 400)    

    def test_signup_without_email(self):
        """Test user registration fails if Email is not specified."""
        user_data = {
            "name":"test",
            "password":"test",
            "role": UserRole.ADMIN,
            "origin": UserOrigin.INTERNAL
        }

        res = self.client.post('/api/user/new', data=user_data)
        result = json.loads(res.data.decode())
        self.assertEqual(
            result['message'], {'email': 'Email field cannot be left blank!'})
        self.assertEqual(res.status_code, 400)

    def test_signup_existing_user(self):
        """Test user registration fails if user already exists in the system."""
        user_data = {
            "name":"test",
            "password":"test",
            "email":"test@gmail.com",
            "role": UserRole.ADMIN,
            "origin": UserOrigin.INTERNAL
        }

        res = self.client.post('/api/user/new', data=user_data)
        res = self.client.post('/api/user/new', data=user_data)
        result = json.loads(res.data.decode())
        self.assertEqual(
            result['message'], "Cannot create user - name already exists")
        self.assertEqual(res.status_code, 400)