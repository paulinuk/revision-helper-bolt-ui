from flask import Blueprint

swagger_ui_blueprint = Blueprint('swagger_ui', __name__)

@swagger_ui_blueprint.route('/api/docs')
def swagger_ui():
    return '''
    <!DOCTYPE html>
    <html>
    <head>
        <title>Swagger UI</title>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.36.0/swagger-ui.css" rel="stylesheet">
    </head>
    <body>
        <div id="swagger-ui"></div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.36.0/swagger-ui-bundle.js"></script>
        <script>
            const ui = SwaggerUIBundle({
                url: '/api/swagger/swagger.json',  // Ensure this path is correct
                dom_id: '#swagger-ui',
            });
        </script>
    </body>
    </html>
    '''
