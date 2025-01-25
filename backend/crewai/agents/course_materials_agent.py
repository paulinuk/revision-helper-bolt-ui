import sqlite3
import yaml
import openai
import json
from datetime import datetime

class CourseMaterialsAgent:
  def __init__(self):
    self.conn = sqlite3.connect('local_database/revision_helper.db')
    with open('crewai/agents/yaml/course_materials_agent.yaml', 'r') as file:
      self.config = yaml.safe_load(file)
    with open('config/config.json', 'r') as file:
      config = json.load(file)
      openai.api_key = config['openai_api_key']

  def add_material(self, course_id, name, materialType, rawData):
    cursor = self.conn.cursor()
    upload_date = datetime.now().strftime('%Y-%m-%d')

    # Extract text from rawData using AI
    extractedData = self.extract_text(rawData, materialType)

    cursor.execute('''
    INSERT INTO course_materials (course_id, name, upload_date, materialType, rawData, extractedData)
    VALUES (?, ?, ?, ?, ?, ?)
    ''', (course_id, name, upload_date, materialType, rawData, extractedData))

    self.conn.commit()

  def extract_text(self, rawData, materialType):
    # Use AI to extract text from rawData
    response = openai.Completion.create(
      engine="text-davinci-003",
      prompt=f"Extract text from the following {materialType} data: {rawData}",
      max_tokens=500
    )

    extracted_text = response.choices[0].text.strip()
    return extracted_text

  def get_materials(self, course_id):
    cursor = self.conn.cursor()
    cursor.execute('''
    SELECT id, name, upload_date, materialType, extractedData FROM course_materials WHERE course_id = ?
    ''', (course_id,))
    materials = cursor.fetchall()
    return materials
