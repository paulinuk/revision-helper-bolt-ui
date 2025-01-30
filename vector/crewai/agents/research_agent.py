import logging
from crewai.agents.model_agent import ModelAgent

logging.basicConfig(filename="logs/research_agent.log", level=logging.INFO, 
                    format="%(asctime)s - %(levelname)s - %(message)s")

class ResearchAgent:
    def __init__(self, subject: str, config=None):
        if not config:
            raise ValueError("Configuration is required for initializing the ResearchAgent.")
        self.subject = subject
        self.config = config
        self.model_agent = ModelAgent()

    def summarize_text(self, text, level):
        prompt = f"Summarize the following educational content on {self.subject} at a {level} level: {text}"
        response = self.model_agent.generate_response(prompt)
        logging.info(f"Subject: {self.subject} | Level: {level} | Summary: {response[:50]}...")
        return response