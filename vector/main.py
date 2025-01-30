import yaml
from crewai.agents import ResearchAgent, QuestionAgent, DatabaseAgent

def load_config(file_path):
    with open(file_path, "r") as file:
        return yaml.safe_load(file)

def main():
    research_config = load_config("yaml/research_agent.yaml")
    question_config = load_config("yaml/question_agent.yaml")
    database_config = load_config("yaml/database_agent.yaml")

    research_agent = ResearchAgent(subject="Quantum Physics", config=research_config)
    question_agent = QuestionAgent(subject="Quantum Physics", config=question_config)
    database_agent = DatabaseAgent(config=database_config)

    topics = ["Quantum Entanglement", "Wave-Particle Duality"]
    retrieved_data = research_agent.retrieve_multiple_topics(topics)

    for topic, summaries in retrieved_data.items():
        print(f"\n🔹 {topic}:")
        for summary in summaries:
            print(f" - {summary['topic']}: {summary['content']}")

if __name__ == "__main__":
    main()