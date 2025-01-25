import inspect
from flask import Blueprint
from routing.establishments_route import EstablishmentsRoute
from routing.courses_route import CoursesRoute
from routing.quizzes_route import QuizzesRoute
from routing.questions_route import QuestionsRoute
from routing.student_quiz_route import StudentQuizRoute

def register_routes(app):
  # List of route classes
  route_classes = [
    EstablishmentsRoute,
    CoursesRoute,
    QuizzesRoute,
    QuestionsRoute,
    StudentQuizRoute
  ]

  for route_class in route_classes:
    route_instance = route_class()
    blueprint = route_instance.blueprint

    # Use reflection to register all public methods as routes
    for name, method in inspect.getmembers(route_instance, predicate=inspect.ismethod):
      if not name.startswith('_'):  # Ignore private methods
        app.register_blueprint(blueprint, url_prefix=f'/api/{blueprint.name}')
