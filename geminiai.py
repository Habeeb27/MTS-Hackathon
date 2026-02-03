from google import genai
from dotenv import load_dotenv
import os

# Load environment variables from .env
load_dotenv()

# Get the API key from the environment
api_key = os.getenv("GOOGLE_API_KEY")

client = genai.Client(api_key=api_key)

def get_ai_response(user_message):
    """
    Generate an AI response using Google's Gemini AI.

    Args:
        user_message (str): The user's message to respond to.

    Returns:
        str: The AI's response text.
    """
    try:
        response = client.models.generate_content(
            model="models/gemini-2.5-flash",
            contents=user_message
        )
        return response.text
    except Exception as e:
        print(f"Error generating AI response: {e}")
        return "I'm sorry, I'm having trouble responding right now. Please try again later."

# Career Assessment Questions
CAREER_ASSESSMENT_QUESTIONS = [
    {
        "id": "interests",
        "question": "What activities or subjects do you find most interesting? (e.g., technology, helping others, creative work, business, science, etc.)",
        "type": "text"
    },
    {
        "id": "skills",
        "question": "What are your strongest skills or talents? (e.g., problem-solving, communication, leadership, technical skills, artistic abilities)",
        "type": "text"
    },
    {
        "id": "work_environment",
        "question": "What type of work environment do you prefer? (office, remote, outdoor, creative studio, lab, classroom, etc.)",
        "type": "text"
    },
    {
        "id": "work_life_balance",
        "question": "How important is work-life balance to you? (very important, somewhat important, not very important)",
        "type": "choice",
        "options": ["Very Important", "Somewhat Important", "Not Very Important"]
    },
    {
        "id": "salary_expectations",
        "question": "What are your salary expectations for your first job? (entry-level, competitive, high-paying)",
        "type": "choice",
        "options": ["Entry-level", "Competitive", "High-paying"]
    },
    {
        "id": "career_goals",
        "question": "What are your long-term career goals? (e.g., leadership position, entrepreneurship, specialization, work-life balance)",
        "type": "text"
    },
    {
        "id": "education_level",
        "question": "What is your current education level? (high school, bachelor's, master's, PhD, other)",
        "type": "choice",
        "options": ["High School", "Bachelor's Degree", "Master's Degree", "PhD", "Other"]
    },
    {
        "id": "experience",
        "question": "Do you have any relevant work or volunteer experience? If yes, please describe briefly.",
        "type": "text"
    },
    {
        "id": "challenges",
        "question": "What challenges or obstacles do you think you might face in your career?",
        "type": "text"
    },
    {
        "id": "motivation",
        "question": "What motivates you most in a job? (money, impact, creativity, stability, growth, etc.)",
        "type": "text"
    }
]

def analyze_career_assessment(answers):
    """
    Analyze career assessment answers and provide career suggestions.

    Args:
        answers (dict): Dictionary of question_id: answer pairs

    Returns:
        dict: Analysis results with career suggestions
    """
    # Create a comprehensive prompt for career analysis
    prompt = f"""
You are a career guidance expert. Based on the following assessment answers, provide detailed career suggestions.

Assessment Answers:
{chr(10).join([f"{q['question']}: {answers.get(q['id'], 'Not answered')}" for q in CAREER_ASSESSMENT_QUESTIONS])}

Please provide:
1. A brief personality/career profile summary (2-3 sentences)
2. Top 3 recommended career paths with detailed explanations
3. For each career: required skills, education, salary range, job outlook
4. Action steps for the next 6 months

Format your response as a JSON object with this structure:
{{
    "summary": "Brief summary text",
    "careers": [
        {{
            "title": "Career Title",
            "description": "Detailed explanation why this fits",
            "skills": ["skill1", "skill2", "skill3"],
            "education": "Required education level",
            "salary_range": "$X - $Y per year",
            "outlook": "Job market outlook description",
            "action_steps": ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Step 6"]
        }}
    ]
}}

Keep explanations detailed but concise. Focus on realistic, achievable career paths.
"""

    try:
        response = client.models.generate_content(
            model="models/gemini-2.5-flash",
            contents=prompt
        )

        # Parse the JSON response
        import json
        result = json.loads(response.text.strip())

        # Validate the structure
        if "summary" not in result or "careers" not in result:
            raise ValueError("Invalid response structure")

        return result

    except Exception as e:
        print(f"Error in career analysis: {e}")
        # Return fallback suggestions
        return {
            "summary": "Based on your answers, you show strong potential for careers that match your interests and skills.",
            "careers": [
                {
                    "title": "Software Developer",
                    "description": "A great fit for those interested in technology and problem-solving.",
                    "skills": ["Programming", "Problem Solving", "Communication"],
                    "education": "Bachelor's in Computer Science or related field",
                    "salary_range": "$70,000 - $120,000 per year",
                    "outlook": "High demand with excellent growth prospects",
                    "action_steps": [
                        "Learn a programming language (Python/JavaScript)",
                        "Build personal projects",
                        "Get online certifications",
                        "Network on LinkedIn",
                        "Apply for internships",
                        "Consider computer science degree"
                    ]
                },
                {
                    "title": "Business Analyst",
                    "description": "Ideal for analytical thinkers who enjoy working with data and business strategy.",
                    "skills": ["Data Analysis", "Communication", "Problem Solving"],
                    "education": "Bachelor's in Business, Economics, or related field",
                    "salary_range": "$60,000 - $90,000 per year",
                    "outlook": "Strong demand in various industries",
                    "action_steps": [
                        "Learn Excel and data visualization tools",
                        "Study business fundamentals",
                        "Get SQL certification",
                        "Join business analysis communities",
                        "Seek entry-level analyst positions",
                        "Pursue MBA if interested in advancement"
                    ]
                },
                {
                    "title": "Marketing Specialist",
                    "description": "Perfect for creative individuals who enjoy communication and brand building.",
                    "skills": ["Communication", "Creativity", "Digital Marketing"],
                    "education": "Bachelor's in Marketing, Communications, or related field",
                    "salary_range": "$45,000 - $75,000 per year",
                    "outlook": "Growing field with digital transformation",
                    "action_steps": [
                        "Learn digital marketing tools (Google Ads, Social Media)",
                        "Build a portfolio of marketing projects",
                        "Get Google Analytics certification",
                        "Join marketing communities",
                        "Apply for marketing coordinator roles",
                        "Consider specialized certifications"
                    ]
                }
            ]
        }
