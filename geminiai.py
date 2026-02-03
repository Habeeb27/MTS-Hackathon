from google import genai
from dotenv import load_dotenv
import os

# Load environment variables from .env
load_dotenv()

# Get the API key from the environment
api_key = os.getenv("GOOGLE_API_KEY")

client = genai.Client(api_key=api_key)
while True:
    user_input = input("You: ")
    if user_input.lower() in ["exit", "quit"]:
        break
    response = client.models.generate_content(
        model="models/gemini-2.5-flash",
        contents=user_input
    )
    print("My_Gee:", response.text)