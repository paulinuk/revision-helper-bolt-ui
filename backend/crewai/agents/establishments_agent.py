import sqlite3
import yaml
import json

class EstablishmentsAgent:
    def __init__(self):
        self.conn = sqlite3.connect('backend/local_database/revision_helper.db')
        with open('backend/crewai/agents/yaml/establishments_agent.yaml', 'r') as file:
            self.config = yaml.safe_load(file)

    def get_establishments(self):
        cursor = self.conn.cursor()
        cursor.execute('SELECT * FROM establishments')
        establishments = cursor.fetchall()
        return establishments
