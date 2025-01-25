import sqlite3
import yaml
import openai
import json

class QuestionQualityAgent:
  def __init__(self):
    self.conn = sqlite3.connect('local_database/revision_helper.db')
    with open('crewai/agents/yaml/question_quality_agent.yaml', 'r') as file:
      self.config = yaml.safe_load(file)
    with open('config/config.json', 'r') as file:
      config = json.load(file)
      openai.api_key = config['openai_api_key']

  def evaluate_question(self, course_id, proposed_question, answers, correct_answer, topic, difficulty_level):
    cursor = self.conn.cursor()

    # Retrieve the approved course overview
    cursor.execute('''
    SELECT course_overview FROM courses WHERE id = ? AND approved = TRUE
    ''', (course_id,))
    result = cursor.fetchone()

    if not result:
      raise ValueError("Course overview not approved or course not found.")

    course_overview = result[0]

    # Prepare data for AI evaluation
    ai_input = {
      "course_overview": course_overview,
      "proposed_question": proposed_question,
      "answers": answers,
      "correct_answer": correct_answer,
      "topic": topic,
      "difficulty_level": difficulty_level
    }

    # Use AI to evaluate the question
    response = openai.Completion.create(
      engine="text-davinci-003",
      prompt=f"Evaluate the following question based on the criteria: {json.dumps(ai_input)}. Ensure only one answer is correct.",
      max_tokens=150
    )

    evaluation_result = json.loads(response.choices[0].text.strip())

    # Check if only one answer is correct
    correct_count = sum(1 for answer in answers if answer == correct_answer)
    if correct_count != 1:
      return False

    return evaluation_result.get("acceptable", False)
