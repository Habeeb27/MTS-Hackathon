import os
import json
from flask import Flask, render_template, request, jsonify
from flask_mail import Mail, Message
from dotenv import load_dotenv
import openai
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv
import os, random, string
from datetime import datetime, timedelta
from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail, Message

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")


app = Flask(__name__, template_folder="templates", static_folder="static")
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")

# Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

app.config["MAIL_SERVER"] = os.getenv("MAIL_SERVER")
app.config["MAIL_PORT"] = int(os.getenv("MAIL_PORT", 587))
app.config["MAIL_USE_TLS"] = os.getenv("MAIL_USE_TLS", "True").lower() == "true"
app.config["MAIL_USE_SSL"] = os.getenv("MAIL_USE_SSL", "False").lower() == "true"
app.config["MAIL_USERNAME"] = os.getenv("MAIL_USERNAME")
app.config["MAIL_PASSWORD"] = os.getenv("MAIL_PASSWORD")
app.config["MAIL_DEFAULT_SENDER"] = os.getenv("MAIL_DEFAULT_SENDER")

mail = Mail(app)


# Landing Page
@app.route("/")
def home():
    return render_template("index.html")

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


# ---------------- MODELS ---------------- #

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(200))
    verified = db.Column(db.Boolean, default=False)
    age = db.Column(db.Integer)
    career_path = db.Column(db.String(200))
    is_student = db.Column(db.Boolean)
    school = db.Column(db.String(200))
    level = db.Column(db.String(100))

class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question_id = db.Column(db.String(50), unique=True)
    text = db.Column(db.String(500))
    type = db.Column(db.String(50))
    placeholder = db.Column(db.String(200))
    required = db.Column(db.Boolean, default=False)
    show_if = db.Column(db.String(50))
    options = db.Column(db.Text)  # JSON string

class EmailVerification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150))
    code = db.Column(db.String(6))
    expires_at = db.Column(db.DateTime)

with app.app_context():
    db.create_all()

    # Seed questions if not already present
    if Question.query.count() == 0:
        questions_data = [
            {
                'question_id': 'age',
                'text': 'How old are you?',
                'type': 'number',
                'placeholder': 'Enter your age',
                'required': True,
                'show_if': None,
                'options': None
            },
            {
                'question_id': 'careerPath',
                'text': 'What\'s your current or desired career path?',
                'type': 'text',
                'placeholder': 'e.g., Software Engineering, Medicine, Business',
                'required': True,
                'show_if': None,
                'options': None
            },
            {
                'question_id': 'isStudent',
                'text': 'Are you currently a student?',
                'type': 'choice',
                'placeholder': None,
                'required': True,
                'show_if': None,
                'options': json.dumps(['Yes', 'No'])
            },
            {
                'question_id': 'school',
                'text': 'Which school are you attending?',
                'type': 'text',
                'placeholder': 'Enter your school name',
                'required': False,
                'show_if': 'Yes',
                'options': None
            },
            {
                'question_id': 'level',
                'text': 'Which level are you in?',
                'type': 'select',
                'placeholder': None,
                'required': False,
                'show_if': 'Yes',
                'options': json.dumps(['100 Level', '200 Level', '300 Level', '400 Level', '500 Level'])
            }
        ]

        for q_data in questions_data:
            question = Question(
                question_id=q_data['question_id'],
                text=q_data['text'],
                type=q_data['type'],
                placeholder=q_data['placeholder'],
                required=q_data['required'],
                show_if=q_data['show_if'],
                options=q_data['options']
            )
            db.session.add(question)
        db.session.commit()

# ---------------- HELPERS ---------------- #

def generate_code():
    return ''.join(random.choices(string.digits, k=6))

def send_verification_email(email, code):
    msg = Message(
        "Verify your Pathfinder account",
        sender=app.config['MAIL_USERNAME'],
        recipients=[email]
    )
    msg.body = f"""
Your Pathfinder verification code is:

{code}

This code expires in 10 minutes.
"""
    mail.send(msg)

# ---------------- ROUTES ---------------- #

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/login')
def login():
    return render_template('login.html')


# -------- SIGNUP -------- #
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get('signupName')
    email = data.get('signupEmail')
    password = data.get('signupPassword')

    # Check if user already exists and is verified
    existing_user = User.query.filter_by(email=email).first()
    if existing_user and existing_user.verified:
        return jsonify({"status": "error", "message": "Email already exists"}), 400

    # If user exists but not verified, delete them and any verification records
    if existing_user and not existing_user.verified:
        EmailVerification.query.filter_by(email=email).delete()
        db.session.delete(existing_user)
        db.session.commit()

    user = User(
        name=name,
        email=email,
        password=generate_password_hash(password),
        verified=False
    )
    db.session.add(user)

    code = generate_code()
    verification = EmailVerification(
        email=email,
        code=code,
        expires_at=datetime.utcnow() + timedelta(minutes=10)
    )
    db.session.add(verification)
    db.session.commit()

    try:
        send_verification_email(email, code)
        return jsonify({
            "status": "success",
            "message": "Verification code sent",
            "email": email
        })
    except Exception as e:
        print(f"Email sending failed: {e}")
        db.session.delete(verification)
        db.session.delete(user)
        db.session.commit()
        return jsonify({
            "status": "error",
            "message": "Failed to send verification email. Please try again."
        }), 500

# -------- VERIFY EMAIL -------- #
@app.route('/verify', methods=['POST'])
def verify_email():
    data = request.get_json()
    email = data.get('email')
    code = data.get('code')

    record = EmailVerification.query.filter_by(email=email, code=code).first()

    if not record:
        return jsonify({"status": "error", "message": "Invalid code"}), 400

    if record.expires_at < datetime.utcnow():
        return jsonify({"status": "error", "message": "Code expired"}), 400

    user = User.query.filter_by(email=email).first()
    user.verified = True

    db.session.delete(record)
    db.session.commit()

    return jsonify({"status": "success", "message": "Email verified successfully"})

# -------- RESEND CODE -------- #
@app.route('/resend-code', methods=['POST'])
def resend_code():
    data = request.get_json()
    email = data.get('email')

    EmailVerification.query.filter_by(email=email).delete()

    code = generate_code()
    verification = EmailVerification(
        email=email,
        code=code,
        expires_at=datetime.utcnow() + timedelta(minutes=10)
    )
    db.session.add(verification)
    db.session.commit()

    send_verification_email(email, code)

    return jsonify({"status": "success", "message": "Code resent"})

# -------- LOGIN -------- #
@app.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    email = data.get('loginEmail')
    password = data.get('loginPassword')

    if not email or not password:
        return jsonify({"status": "error", "message": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"status": "error", "message": "Invalid email or password"}), 401

    if not check_password_hash(user.password, password):
        return jsonify({"status": "error", "message": "Invalid email or password"}), 401

    if not user.verified:
        return jsonify({"status": "error", "message": "Please verify your email before logging in"}), 403

    return jsonify({
        "status": "success",
        "message": "Login successful",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    })

# -------- FORGOT PASSWORD -------- #
@app.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    email = data.get('forgotEmail')

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"status": "error", "message": "Email not found"}), 400

    code = generate_code()
    verification = EmailVerification(
        email=email,
        code=code,
        expires_at=datetime.utcnow() + timedelta(minutes=10)
    )
    db.session.add(verification)
    db.session.commit()

    send_verification_email(email, code)

    return jsonify({"status": "success", "message": "Reset code sent"})

# -------- RESET PASSWORD -------- #
@app.route('/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json()
    email = data.get('email')
    code = data.get('code')
    new_password = data.get('newPassword')

    record = EmailVerification.query.filter_by(email=email, code=code).first()
    if not record or record.expires_at < datetime.utcnow():
        return jsonify({"status": "error", "message": "Invalid or expired code"}), 400

    user = User.query.filter_by(email=email).first()
    user.password = generate_password_hash(new_password)

    db.session.delete(record)
    db.session.commit()

    return jsonify({"status": "success", "message": "Password reset successful"})

# -------- GET USER PROFILE -------- #
@app.route('/get-profile', methods=['GET'])
def get_profile():
    # In a real app, you'd get user_id from session/token
    # For now, we'll assume the user is logged in and get from query param
    email = request.args.get('email')
    if not email:
        return jsonify({"status": "error", "message": "Email required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"status": "error", "message": "User not found"}), 404

    return jsonify({
        "status": "success",
        "profile": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "age": user.age,
            "career_path": user.career_path,
            "is_student": user.is_student,
            "school": user.school,
            "level": user.level
        }
    })

# -------- UPDATE USER PROFILE -------- #
@app.route('/update-profile', methods=['POST'])
def update_profile():
    data = request.get_json()
    email = data.get('email')
    updates = data.get('updates', {})

    if not email:
        return jsonify({"status": "error", "message": "Email required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"status": "error", "message": "User not found"}), 404

    # Update fields if provided
    if 'name' in updates:
        user.name = updates['name']
    if 'age' in updates:
        user.age = updates['age']
    if 'career_path' in updates:
        user.career_path = updates['career_path']
    if 'is_student' in updates:
        user.is_student = updates['is_student']
    if 'school' in updates:
        user.school = updates['school']
    if 'level' in updates:
        user.level = updates['level']

    db.session.commit()

    return jsonify({"status": "success", "message": "Profile updated successfully"})

# -------- SAVE QUESTIONNAIRE -------- #
@app.route('/save-questionnaire', methods=['POST'])
def save_questionnaire():
    data = request.get_json()
    email = data.get('email')
    answers = data.get('answers', {})

    if not email:
        return jsonify({"status": "error", "message": "Email required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"status": "error", "message": "User not found"}), 404

    # Update user fields with questionnaire answers
    if 'age' in answers:
        user.age = answers['age']
    if 'careerPath' in answers:
        user.career_path = answers['careerPath']
    if 'isStudent' in answers:
        user.is_student = answers['isStudent'] == 'Yes'
    if 'school' in answers:
        user.school = answers['school']
    if 'level' in answers:
        user.level = answers['level']

    db.session.commit()

    return jsonify({"status": "success", "message": "Questionnaire saved successfully"})

# -------- GET QUESTIONS -------- #
@app.route('/get-questions', methods=['GET'])
def get_questions():
    questions = Question.query.all()
    questions_list = []
    for q in questions:
        question_dict = {
            'id': q.question_id,
            'text': q.text,
            'type': q.type,
            'placeholder': q.placeholder,
            'required': q.required,
            'show_if': q.show_if
        }
        if q.options:
            try:
                question_dict['options'] = json.loads(q.options)
            except json.JSONDecodeError:
                question_dict['options'] = []
        else:
            question_dict['options'] = []
        questions_list.append(question_dict)

    return jsonify({"status": "success", "questions": questions_list})

if __name__ == "__main__":
    app.run(debug=True)

