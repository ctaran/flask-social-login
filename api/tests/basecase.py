import unittest
from api import app
from database.db import db

class BaseCase(unittest.TestCase):

    def setUp(self):
        self.app = app
        self.client = self.app.test_client()
        
        with self.app.app_context():
            # create all tables
            db.session.close()
            db.drop_all()
            db.create_all()

    def tearDown(self) -> None:
        # Delete Database collections after the test is complete
        with self.app.app_context():
            # drop all tables
            db.session.close()
            db.drop_all()