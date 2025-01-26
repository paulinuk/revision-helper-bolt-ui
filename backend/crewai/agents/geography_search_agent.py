from crewai import Agent
from crewai_tools import SerpAPITool

class GeographyResearchAgent:
    def __init__(self):
        # Initialize SerpAPI tool with API key
        self.search_tool = SerpAPITool(api_key="e90461be79eb06be5518f535b33882d06b66236ad7f8398e47a7336d06d116ba")
        
        # Define the agent
        self.agent = Agent(
            name="Geography Research Agent",
            description="Searches the internet for material relevant to geography courses and compiles summaries into a single document.",
            tools=[self.search_tool],
            verbose=True,
        )
    
    def search_geography_material(self, topic):
        """Search the internet for geography-related materials based on a topic."""
        search_query = f"{topic} site:.edu OR site:.gov OR site:.org OR site:nationalgeographic.com"
        results = self.search_tool.run(search_query)
        return results
    
    def process_results(self, results):
        """Extract key information from search results for document compilation."""
        processed_data = []
        for result in results:
            processed_data.append(f"Title: {result.get('title')}\nURL: {result.get('url')}\nSummary: {result.get('snippet')}\n\n")
        return processed_data
    
    def compile_document(self, topics):
        """Compile all summaries into a single text document."""
        document_content = """Geography Research Compilation\n============================\n"""
        for topic in topics:
            raw_results = self.search_geography_material(topic)
            summaries = self.process_results(raw_results)
            document_content += f"\n## {topic}\n\n" + "".join(summaries)
        
        with open("geography_research.txt", "w", encoding="utf-8") as file:
            file.write(document_content)
        
        return "geography_research.txt"

# Example usage
if __name__ == "__main__":
    agent = GeographyResearchAgent()
    topics = [
        "Plate Tectonics and Earthquakes", "Climate Change and Global Warming", "Urbanization and Megacities", 
        "Geographic Information Systems (GIS)", "Amazon Rainforest Ecosystem", "Tourism and Its Effects on Local Economies"
    ]
    document_path = agent.compile_document(topics)
    print(f"Research document created: {document_path}")
