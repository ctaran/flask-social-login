import os
from datetime import timedelta

class Config(object):
    """Parent configuration class."""
    DEBUG = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///database/social_login.db'
    JWT_SECRET_KEY = os.getenv('SOCIAL_LOGIN_JWT_KEY')

class DevelopmentConfig(Config):
    """Configuration for Development."""
    DEBUG = True
    JWT_SECRET_KEY = "super-secret-dev-key"

class TestingConfig(Config):
    """Configuration for Testing."""
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///database/social_login_test.db'
    DEBUG = True
    JWT_SECRET_KEY = "super-secret-test-key"

class ProductionConfig(Config):
    """Configuration for Production."""
    DEBUG = False
    TESTING = False

app_config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
}
