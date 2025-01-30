import json
import logging
from crewai.agents.models.openai_model import OpenAIModelAgent
from crewai.agents.models.deepseek_model import DeepSeekModelAgent

logging.basicConfig(filename="logs/model_agent.log", level=logging.INFO, 
                    format="%(asctime)s - %(levelname)s - %(message)s")

class ModelAgent:
    def __init__(self, config_path="config.json"):
        with open(config_path, "r") as file:
            self.config = json.load(file)

        self.default_model = self.config["default_model"]
        self.model_agents = {
            "openai": OpenAIModelAgent(self.config),
            "deepseek": DeepSeekModelAgent(self.config)
        }

    def generate_response(self, prompt):
        model_agent = self.model_agents.get(self.default_model)
        if not model_agent:
            logging.error(f"Model '{self.default_model}' is not configured.")
            raise ValueError(f"Model '{self.default_model}' is not configured.")

        try:
            response = model_agent.generate_response(prompt)
            logging.info(f"Model: {self.default_model} | Prompt: {prompt[:50]}... | Response: {response[:50]}...")
            return response
        except Exception as e:
            logging.error(f"Error in {self.default_model}: {str(e)}")
            return "Error generating response." 