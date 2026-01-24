import os
from dotenv import load_dotenv
import openai


load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")


print("\n🚀 Welcome to PathFinders – Quick Career Test")
print("This is a short preview to show how PathFinders understands you.")
print("Answer 4 quick questions to get a sneak peek.\n")


quick_questions = [
    {
        "key": "stage",
        "question": "Where are you right now in your journey?",
        "options": [
            "Student",
            "Graduate",
            "Working professional",
            "Career switcher"
        ]
    },
    {
        "key": "interest",
        "question": "What do you enjoy doing the most?",
        "options": [
            "Solving problems / logic",
            "Creating or designing things",
            "Working with data or numbers",
            "Communicating / leading people"
        ]
    },
    {
        "key": "goal",
        "question": "What do you want most from your career?",
        "options": [
            "High income",
            "Stability",
            "Flexibility / remote work",
            "Impact & creativity"
        ]
    },
    {
        "key": "effort",
        "question": "How much time can you realistically commit weekly?",
        "options": [
            "Less than 5 hours",
            "5–10 hours",
            "10–20 hours",
            "20+ hours"
        ]
    }
]


answers = {}

for q in quick_questions:
    print("Options:", ", ".join(q["options"]))
    while True:
        user_input = input(q["question"] + "\nYour answer: ").strip()
        if user_input.lower() == "exit":
            print("Goodbye 👋")
            exit()
        if user_input:
            answers[q["key"]] = user_input
            break
        else:
            print("⚠️ Please enter a valid answer.\n")


def generate_teaser_insight(user_answers):
    prompt = f"""
You are PathFinders Quick Test, a preview career assistant.

Your task:
- Analyze the user's answers
- Give a short, insightful personality/career direction summary
- DO NOT suggest specific job titles
- DO NOT give full career advice
- Build curiosity and encourage sign-up
- Keep it under 120 words
- Use friendly, confident language

User answers:
{user_answers}
"""

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are PathFinders Quick Test assistant."},
                {"role": "user", "content": prompt}
            ]
        )
        return response["choices"][0]["message"]["content"]
    except Exception:
        return (
            "Based on your answers, you have clear preferences and goals that strongly shape your career direction.\n"
            "PathFinders has enough signals to start mapping roles, skills, and learning paths that fit you —\n"
            "but the full breakdown is unlocked after sign-up."
        )


print("\n🔍 Analyzing your responses...\n")
teaser_result = generate_teaser_insight(answers)

print("🧭 PathFinders Preview Insight:\n")
print(teaser_result)

print("\n🔐 Want your full career path, learning roadmap, and next steps?")
print("👉 Create an account to unlock your complete PathFinders result.\n")
