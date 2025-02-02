import sqlite3
import yaml

class EstablishmentsAgent:
    def __init__(self):
        self.conn = sqlite3.connect('local_database/revision_helper.db')
        with open('crewai/agents/yaml/establishments_agent.yaml', 'r') as file:
            self.config = yaml.safe_load(file)

    def get_establishments(self):
        cursor = self.conn.cursor()
        cursor.execute('SELECT * FROM establishments ORDER BY name')
        establishments = cursor.fetchall()
        return establishments
