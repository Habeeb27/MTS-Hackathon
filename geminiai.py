from google import genai

client = genai.Client()

while True:
    user_input = input("You: ")
    if user_input.lower() in ["exit", "quit"]:
        break
    response = client.models.generate_content(
        model="models/gemini-2.5-flash",
        contents=user_input
    )
    print("My_Gee:", response.text)