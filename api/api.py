import os
import time
from flask import Flask
from flask_restful import Api

from configuration.config import app_config
from resources.routes import initialize_routes
from database.db import db

app = Flask(__name__)
launch_env = os.getenv('FLASK_ENV')
app.config.from_object(app_config[launch_env])

api = Api(app)
initialize_routes(api)

@app.before_first_request
def create_tables():
    db.create_all()

db.init_app(app)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}