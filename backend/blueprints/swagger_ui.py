from flask import Blueprint, send_from_directory
from flask_swagger_ui import get_swaggerui_blueprint
import os

swagger_ui_blueprint = Blueprint('swagger_ui', __name__)

SWAGGER_URL = "/api/docs"
API_URL = "/api/swagger.json"  # Correct path

swagger_blueprint = get_swaggerui_blueprint(SWAGGER_URL, API_URL)

@swagger_ui_blueprint.route('/api/swagger.json')
def swagger_json():
    return send_from_directory(os.getcwd(), 'swagger.json')  # Serve from root directory
