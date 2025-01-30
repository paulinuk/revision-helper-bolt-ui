from crewai.agents.model_agent import ModelAgent

class QuestionAgent:
    def __init__(self, subject: str, config=None):
        if not config:
            raise ValueError("Configuration is required for initializing the QuestionAgent.")
        self.subject = subject
        self.config = config
        self.model_agent = ModelAgent()

    def generate_quiz(self, topic: str):
        prompt = f"Generate 10 GCSE {self.subject} multiple-choice questions based on {topic}."
        return self.model_agent.generate_response(prompt)