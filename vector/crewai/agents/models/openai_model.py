import openai

class OpenAIModelAgent:
    def __init__(self, config):
        self.api_key = config["models"]["openai"]["api_key"]
        self.model_name = config["models"]["openai"]["model_name"]
        openai.api_key = self.api_key

    def generate_response(self, prompt):
        response = openai.ChatCompletion.create(
            model=self.model_name,
            messages=[{"role": "user", "content": prompt}]
        )
        return response["choices"][0]["message"]["content"]