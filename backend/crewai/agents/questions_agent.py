import sqlite3
import yaml
import openai
import json
from backend.crewai.agents.question_quality_agent import QuestionQualityAgent

class QuestionsAgent:
  def __init__(self):
    self.conn = sqlite3.connect('local_database/revision_helper.db')
    self.quality_agent = QuestionQualityAgent()
    with open('crewai/agents/yaml/questions_agent.yaml', 'r') as file:
      self.config = yaml.safe_load(file)
    with open('config/config.json', 'r') as file:
      config = json.load(file)
      openai.api_key = config['openai_api_key']

  def generate_questions(self, course_id):
    cursor = self.conn.cursor()

    # Retrieve the approved course overview
    cursor.execute('''
    SELECT course_overview FROM courses WHERE id = ? AND approved = TRUE
    ''', (course_id,))
    result = cursor.fetchone()

    if not result:
      raise ValueError("Course overview not approved or course not found.")

    course_overview = result[0]

    # Retrieve existing questions to determine planned difficulty
    cursor.execute('''
    SELECT difficulty_level FROM questions WHERE course_id = ?
    ''', (course_id,))
    existing_difficulties = [row[0] for row in cursor.fetchall()]

    # Calculate planned difficulty based on existing questions
    planned_difficulty = self.calculate_planned_difficulty(existing_difficulties)

    # Use AI to generate a pool of questions strictly based on the course overview
    response = openai.Completion.create(
      engine="text-davinci-003",
      prompt=f"Generate a diverse set of questions using only the following course overview. Ensure each question includes a correct answer derived from the overview and realistic distractors. Assess the difficulty level based on the complexity of the question and the complexity of finding the correct answer. Plan the difficulty to provide a wide range of difficulties, with more complex questions and answers for higher difficulty levels: {course_overview}",
      max_tokens=1000
    )

    generated_questions = json.loads(response.choices[0].text.strip())

    # Evaluate and store approved questions
    for question in generated_questions:
      proposed_question = question['text']
      answers = question['options']
      correct_answer = question['correct_answer']
      topic = question['topic']
      difficulty_level = question['difficulty_level']

      # Ensure the correct answer is derived from the course overview
      if correct_answer not in course_overview:
        continue

      # Use AI to generate distractors if not feasible from the overview
      if len(answers) < 4:
        ai_response = openai.Completion.create(
          engine="text-davinci-003",
          prompt=f"Generate realistic distractors for the following question based on the course overview: {proposed_question}",
          max_tokens=50
        )
        additional_distractors = json.loads(ai_response.choices[0].text.strip())
        answers.extend(additional_distractors)

      if self.quality_agent.evaluate_course_question(course_id, proposed_question, answers, correct_answer, topic, difficulty_level):
        cursor.execute('''
        INSERT INTO questions (text, options, correct_answer, course_id, topic, difficulty_level)
        VALUES (?, ?, ?, ?, ?, ?)
        ''', (proposed_question, json.dumps(answers), correct_answer, course_id, topic, difficulty_level))

    self.conn.commit()

  def calculate_planned_difficulty(self, existing_difficulties):
    if not existing_difficulties:
      return 5  # Default to medium difficulty if no existing questions

    # Calculate the average difficulty and adjust to ensure a wide range
    average_difficulty = sum(existing_difficulties) / len(existing_difficulties)
    return max(1, min(10, round(average_difficulty)))
