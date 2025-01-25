import sqlite3
import yaml
import openai
import json

class QuestionGenerationAgent:
    def __init__(self):
        self.conn = sqlite3.connect('local_database/revision_helper.db')
        with open('backend/agents/yaml/question_generation_agent.yaml', 'r') as file:
            self.config = yaml.safe_load(file)
        with open('backend/config/config.json', 'r') as file:
            config = json.load(file)
            openai.api_key = config['openai_api_key']

    def generate_questions(self, syllabus):
        # Use OpenAI to generate questions from the syllabus
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=f"Generate a set of questions based on the following syllabus: {syllabus}",
            max_tokens=150
        )
        questions = response.choices[0].text.strip()
        return questions
