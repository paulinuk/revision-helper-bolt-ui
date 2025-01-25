import sqlite3
import yaml
import openai
import json

class CourseOverviewAgent:
  def __init__(self):
    self.conn = sqlite3.connect('local_database/revision_helper.db')
    with open('crewai/agents/yaml/course_overview_agent.yaml', 'r') as file:
      self.config = yaml.safe_load(file)
    with open('config/config.json', 'r') as file:
      config = json.load(file)
      openai.api_key = config['openai_api_key']

  def generate_overview(self, course_id, overview_mode):
    cursor = self.conn.cursor()
    cursor.execute('''
    SELECT extractedData FROM course_materials WHERE course_id = ?
    ''', (course_id,))
    materials = cursor.fetchall()

    # Combine all extracted text
    combined_text = " ".join([material[0] for material in materials if material[0]])

    if overview_mode == 'static':
      overview = combined_text
    elif overview_mode == 'AiGenerated':
      # Use AI to generate a concise overview
      response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=f"Provide a fact-based overview of the following course material: {combined_text}",
        max_tokens=500
      )
      overview = response.choices[0].text.strip()
    else:
      raise ValueError("Invalid OverviewMode. Choose 'static' or 'AiGenerated'.")

    # Store the overview in the courses table with approved set to false
    cursor.execute('''
    UPDATE courses SET course_overview = ?, approved = FALSE WHERE id = ?
    ''', (overview, course_id))
    self.conn.commit()

    return overview

  def approve_overview(self, course_id):
    cursor = self.conn.cursor()
    cursor.execute('''
    UPDATE courses SET approved = TRUE WHERE id = ?
    ''', (course_id,))
    self.conn.commit()
