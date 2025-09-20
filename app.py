import requests
import os
from openai import OpenAI
from flask import Flask, request, jsonify
from dotenv import load_dotenv

## GLOBAL CONFIGURATION
load_dotenv()
API_BASE_URL = "https://api.semanticscholar.org/graph/v1"
MAX_PAPERS = 10
MAX_RELATIONS = 5
GPT_KEY = os.getenv("GPT_KEY")
PROMPT_PATH = os.getenv("PROMPT_PATH")


## SETUP
app = Flask(__name__)
client = OpenAI(api_key=GPT_KEY)
try:
    with open(PROMPT_PATH, 'r') as file:
        PRE_PROMPT = file.read()
except FileNotFoundError:
    print(f"Error: The file '{file_path}' was not found.")
except Exception as e:
    print(f"An error occurred: {e}")


## HELPER FUNCTIONS
def ask_gpt(query):
    response = client.responses.create(
        instructions=PRE_PROMPT,
        model="gpt-4o-mini",
        input=str(query),
    )
    
    return response.output_text


def get_papers(author_id: str, max_papers: int, max_relations: int):
    """
    Fetches papers for an author, including their citations and references,
    in a single, efficient API call.
    """
    print(f"Searching for papers and relations for author ID: {author_id}...")
    
    fields = (
        "paperId,title,abstract,citationCount,"
        "citations.title,citations.year,citations.authors,"
        "references.title,references.year,references.authors"
    )
    
    params = {
        'fields': fields,
        'limit': str(max_papers),
        'citations.limit': str(max_relations),
        'references.limit': str(max_relations)
    }

    url = f"{API_BASE_URL}/author/{author_id}/papers"
    
    try:
        response = requests.get(url, params=params, timeout=30)
        response.raise_for_status()
        return response.json().get('data', [])
    except requests.exceptions.RequestException as e:
        print(f"API request failed: {e}")
        return []


## API ENDPOINTS
@app.route('/researcher/<string:author_id>', methods=['GET'])
def get_researcher_data(author_id):
    """
    API endpoint to get a researcher's papers and their relations.
    """
    limit = MAX_PAPERS # request.args.get('limit', default=2, type=int)
    relations_limit = MAX_RELATIONS # request.args.get('relations_limit', default=5, type=int)
    
    papers_data = get_papers(author_id, limit, relations_limit)
    
    if not papers_data:
        return jsonify({"error": "Researcher not found or has no papers"}), 404
    
    analysis = ask_gpt(papers_data)
    return analysis #jsonify(papers_data)


if __name__ == '__main__':
    app.run(debug=True, port=5000)
