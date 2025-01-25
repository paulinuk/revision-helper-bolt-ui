import sqlite3
import yaml
import openai
import json

class CourseOverviewAgent:
    def __init__(self):
        self.conn = sqlite3.connect('local_database/revision_helper.db')
        with open('backend/agents/yaml/course_overview_agent.yaml', 'r') as file:
            self.config = yaml.safe_load(file)
        with open('backend/config/config.json', 'r') as file:
            config = json.load(file)
            openai.api_key = config['openai_api_key']

    def gather_syllabus(self):
        # Use OpenAI to gather GCSE maths syllabus
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt="Provide a detailed overview of the GCSE Maths syllabus, including key topics and learning objectives.",
            max_tokens=150
        )
        syllabus = response.choices[0].text.strip()
        return syllabus
