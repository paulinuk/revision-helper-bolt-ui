import sqlite3

class DatabaseAgent:
    def __init__(self, config=None):
        if not config:
            raise ValueError("Configuration is required for initializing the DatabaseAgent.")
        self.config = config

    def save_to_database(self, quiz_data: str):
        pass