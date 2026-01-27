import os
from flask import Flask, render_template, request, jsonify
from flask_mail import Mail, Message
from dotenv import load_dotenv
import openai

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")


app = Flask(__name__, template_folder="templates", static_folder="static")


app.config["MAIL_SERVER"] = os.getenv("MAIL_SERVER")
app.config["MAIL_PORT"] = int(os.getenv("MAIL_PORT", 587))
app.config["MAIL_USE_TLS"] = os.getenv("MAIL_USE_TLS") == "True"
app.config["MAIL_USE_SSL"] = os.getenv("MAIL_USE_SSL") == "True"
app.config["MAIL_USERNAME"] = os.getenv("MAIL_USERNAME")
app.config["MAIL_PASSWORD"] = os.getenv("MAIL_PASSWORD")
app.config["MAIL_DEFAULT_SENDER"] = os.getenv("MAIL_DEFAULT_SENDER")

mail = Mail(app)


# Landing Page
@app.route("/")
def home():
    return render_template("index.html")

# Login Page
@app.route("/login")
def login():
    return render_template("login.html")

# Contact Form
@app.route("/contact", methods=["POST"])
def contact():
    if request.is_json:
        data = request.get_json()
        name = data.get("name")
        email = data.get("email")
        phone = data.get("phone")
        message_text = data.get("message")
    else:
        name = request.form.get("name")
        email = request.form.get("email")
        phone = request.form.get("phone")
        message_text = request.form.get("message")

    print("Received:", name, email, phone, message_text)

    if not name or not email or not message_text:
        return jsonify({"status": "error", "message": "Missing required fields."}), 400

    msg = Message(
        subject="📩 New Contact Message – Pathfinder",
        recipients=[os.getenv("MAIL_USERNAME")],
        body=f"""
New contact submission:

Name: {name}
Email: {email}
Phone: {phone}

Message:
{message_text}
"""
    )

    try:
        mail.send(msg)
        return jsonify({"status": "success", "message": "Message sent successfully. We'll get back to you soon!"})
    except Exception as e:
        print("Mail Error:", e)
        return jsonify({"status": "error", "message": "Failed to send message. Please try again later."}), 500

@app.route("/chatbot", methods=["POST"])
def chatbot():
    if request.is_json:
        data = request.get_json()
        answers = {
            "stage": data.get("stage"),
            "interest": data.get("interest"),
            "goal": data.get("goal"),
            "effort": data.get("effort")
        }

        print("Chatbot Answers:", answers)

        
        prompt = f"""
You are PathFinders Quick Test, a friendly career preview assistant.

Analyze these answers and give a short, insightful personality/career direction summary.
Do NOT suggest specific job titles.
Keep it under 120 words.
Encourage the user to sign up for full insights.

User answers:
{answers}
"""
        try:
            response = openai.ChatCompletion.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": "You are PathFinders Quick Test assistant."},
                    {"role": "user", "content": prompt}
                ]
            )
            teaser = response["choices"][0]["message"]["content"]
        except Exception as e:
            print("OpenAI Error:", e)
            teaser = (
                "Based on your answers, you have clear preferences and goals that strongly shape your career direction.\n"
                "PathFinders sees enough signals to start mapping roles and learning paths that fit you — "
                "unlock the full breakdown after sign-up."
            )

        return jsonify({"status": "success", "teaser": teaser})

    return jsonify({"status": "error", "message": "Invalid request"}), 400


if __name__ == "__main__":
    app.run(debug=True)
