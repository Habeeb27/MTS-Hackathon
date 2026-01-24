import os
from dotenv import load_dotenv
import openai


load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

print("🧭 PathFinders – Career Guidance AI (type 'exit' to quit)\n")

questions = [
    # 1️⃣ Background & Exposure
    {"section": "Background & Exposure", "q": "What best describes your current stage?", 
     "key": "stage", "options": ["Secondary school student", "Undergraduate", "Graduate", "Self-taught learner", "Working professional", "Career switcher"]},
    
    {"section": "Background & Exposure", "q": "Have you studied or worked in tech before?", 
     "key": "tech_experience", "options": ["No, complete beginner", "Yes, learning on my own", "Yes, formal education", "Yes, professional experience"]},

    # 2️⃣ Interests
    {"section": "Interests", "q": "Which activities do you enjoy the most? (Select up to 3, separated by comma)", 
     "key": "activities", "options": ["Solving problems / puzzles", "Designing or creating visuals", "Building things step-by-step",
                                      "Analyzing data or numbers", "Teaching or explaining concepts", "Writing or storytelling",
                                      "Managing people or projects"]},

    {"section": "Interests", "q": "Which topics excite you the most? (Select up to 3, separated by comma)", 
     "key": "topics", "options": ["Technology & software", "Business & finance", "Science & research",
                                  "Art & design", "Social impact / helping people", "Entrepreneurship"]},

    # 3️⃣ Skills & Strengths
    {"section": "Skills & Strengths", "q": "Which skills do you already have? (Select all that apply, separated by comma)", 
     "key": "skills", "options": ["Logical thinking", "Creativity", "Communication", "Mathematics", "Coding / programming",
                                  "Design tools (Figma, Canva, etc.)", "Leadership"]},

    {"section": "Skills & Strengths", "q": "How comfortable are you with learning technical skills?", 
     "key": "tech_comfort", "options": ["Very comfortable", "Somewhat comfortable", "Not comfortable yet"]},

    # 4️⃣ Work Style & Personality
    {"section": "Work Style & Personality", "q": "How do you prefer to work?", 
     "key": "work_style", "options": ["Alone", "In a team", "A mix of both"]},

    {"section": "Work Style & Personality", "q": "Which describes you better?", 
     "key": "personality_type", "options": ["I like structure and clear rules", "I like freedom and flexibility"]},

    {"section": "Work Style & Personality", "q": "How do you usually approach problems?", 
     "key": "problem_solving", "options": ["Carefully and step-by-step", "Experiment and figure it out as I go"]},

    # 5️⃣ Goals & Motivation
    {"section": "Goals & Motivation", "q": "What is your main goal right now?", 
     "key": "goal", "options": ["Get a job as soon as possible", "Build long-term expertise", "Start my own business",
                                "Earn money remotely", "Learn for personal growth"]},

    {"section": "Goals & Motivation", "q": "What matters most to you in a career?", 
     "key": "career_priority", "options": ["High income", "Flexibility / remote work", "Stability", "Impact / purpose", "Creativity"]},

    # 6️⃣ Constraints
    {"section": "Constraints", "q": "How much time can you realistically dedicate per week?", 
     "key": "weekly_time", "options": ["Less than 5 hours", "5–10 hours", "10–20 hours", "20+ hours"]},

    {"section": "Constraints", "q": "Do you prefer local or global (remote) opportunities?", 
     "key": "opportunity_type", "options": ["Local", "Remote", "Both"]},

    # 7️⃣ Magic Question
    {"section": "Magic Question", "q": "If you could become really good at ONE thing, what would it be?", 
     "key": "magic_skill", "options": None}  # Free text
]

def get_user_answers():
    answers = {}
    for q in questions:
        print(f"\n--- {q['section']} ---")
        while True:
            if q["options"]:
                print("Options:", ", ".join(q["options"]))
            ans = input(f"{q['q']}\nYour answer: ").strip()
            if ans.lower() == "exit":
                print("Bot: Goodbye 👋")
                exit()
            if ans:
                answers[q["key"]] = ans
                break
            else:
                print("⚠️ Please enter a valid answer.")
    return answers

def suggest_career(answers):
    prompt = f"""
You are PathFinders, a smart career guidance assistant.

Analyze the user's answers and suggest 3–5 suitable career paths.
For each career:
- Give the career title
- Explain WHY it fits the user
- Suggest a possible learning path or starting point

User profile:
{answers}

Rules:
- Do NOT use JSON
- Do NOT use bulletless paragraphs
- Format clearly using numbered lists
- Use clean, readable text
"""

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are PathFinders, a career guidance assistant."},
                {"role": "user", "content": prompt}
            ]
        )
        return response['choices'][0]['message']['content']
    except Exception as e:
        return f"⚠️ Error generating suggestions: {e}"


while True:
    start = input("Type 'start' to get career suggestions or 'exit' to quit: ").strip().lower()
    if start == "exit":
        print("Bot: Goodbye 👋")
        break
    elif start == "start":
        user_answers = get_user_answers()
        print("\n🔍 PathFinders is analyzing your profile...\n")
        career_suggestions = suggest_career(user_answers)
        print("\n🎯 Career Suggestions:\n")
        print(career_suggestions)
        print("\n")
    else:
        print("⚠️ Please type 'start' or 'exit'.")
