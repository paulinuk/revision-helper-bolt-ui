import requests

class DeepSeekModelAgent:
    def __init__(self, config):
        self.api_key = config["models"]["deepseek"]["api_key"]
        self.model_name = config["models"]["deepseek"]["model_name"]
        self.api_url = "https://api.deepseek.com/v1/chat/completions"

    def generate_response(self, prompt):
        headers = {"Authorization": f"Bearer {self.api_key}", "Content-Type": "application/json"}
        payload = {"model": self.model_name, "messages": [{"role": "user", "content": prompt}]}

        response = requests.post(self.api_url, json=payload, headers=headers)
        if response.status_code == 200:
            return response.json()["choices"][0]["message"]["content"]
        return "Error retrieving response from DeepSeek." 