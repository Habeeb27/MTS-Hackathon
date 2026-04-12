import os
import json
import logging
from datetime import datetime, timezone, timedelta
from dotenv import load_dotenv
from flask import Flask, render_template, request, redirect, url_for, flash, session, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
import secrets
from werkzeug.exceptions import BadRequestKeyError
import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

try:
    from geminiai import get_ai_response, analyze_career_assessment, CAREER_ASSESSMENT_QUESTIONS
except ImportError as e:
    logger.warning(f"Could not import geminiai: {e}. Assessment features will be disabled.")
    CAREER_ASSESSMENT_QUESTIONS = []
    def analyze_career_assessment(answers): return {"message": "Assessment not available"}

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__,template_folder='templates', static_folder='static')
app.config['SECRET_KEY'] = os.getenv('FLASK_SECRET_KEY', secrets.token_hex(32))
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.abspath(os.path.join(os.path.dirname(__file__), "instance", "database.db"))}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {'pool_pre_ping': True}

# Email config
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')

# Validate email config
if not app.config['MAIL_USERNAME'] or not app.config['MAIL_PASSWORD']:
    logger.warning("Email configuration incomplete. Email features disabled.")

# Initialize extensions
try:
    db = SQLAlchemy(app)
    login_manager = LoginManager(app)
    login_manager.login_view = 'login'
except Exception as e:
    logger.error(f"Failed to initialize extensions: {e}")
    raise

# Models
class VerificationCode(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), nullable=False, index=True)
    code = db.Column(db.String(6), nullable=False)
    token = db.Column(db.String(64), unique=True, nullable=True, index=True)
    expires = db.Column(db.DateTime, nullable=False)

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    is_verified = db.Column(db.Boolean, default=False)
    assessments = db.Column(db.Text, default='[]')

@login_manager.user_loader
def load_user(user_id):
    try:
        return User.query.get(int(user_id))
    except (ValueError, TypeError):
        return None

# 🔥 SMTP - PORT 465 ONLY
class ReliableSMTP:
    def __init__(self, username, password):
        self.username = username
        self.password = password
        self.port = 465
    
    def send(self, to_email, subject, body, is_html=False):
        try:
            print(f"🔄 Sending via SMTP port 465 (SSL)...")
            context = ssl.create_default_context()
            server = smtplib.SMTP_SSL('smtp.gmail.com', self.port, context=context, timeout=15)
            server.login(self.username, self.password)
            
            msg = MIMEMultipart()
            msg['From'] = self.username
            msg['To'] = to_email
            msg['Subject'] = subject
            msg.attach(MIMEText(body, 'html' if is_html else 'plain'))
            
            server.sendmail(self.username, to_email, msg.as_string())
            server.quit()
            
            print("✅ EMAIL SENT on port 465!")
            logger.info(f"Email sent to {to_email}")
            return True, "Sent via port 465"
            
        except Exception as e:
            print(f"❌ Port 465 failed: {str(e)[:80]}")
            return False, f"Failed: {str(e)[:50]}"

# Initialize SMTP
smtp_sender = None
if app.config['MAIL_USERNAME'] and app.config['MAIL_PASSWORD']:
    smtp_sender = ReliableSMTP(app.config['MAIL_USERNAME'], app.config['MAIL_PASSWORD'])

# Database initialization
def init_db():
    try:
        if not os.path.exists('instance'):
            os.makedirs('instance')
        with app.app_context():
            db.create_all()
            logger.info("Database initialized successfully")
    except Exception as e:
        logger.error(f"Database initialization failed: {e}")
        raise

init_db()

def get_auth_data(request, prefix=''):
    try:
        if request.is_json:
            json_data = request.get_json(silent=True) or {}
            email = (json_data.get(f'{prefix}Email') or json_data.get('email') or '').strip().lower()
            password = json_data.get(f'{prefix}Password') or json_data.get('password') or ''
        else:
            email = (request.form.get(f'{prefix}Email') or request.form.get('email') or '').strip().lower()
            password = request.form.get(f'{prefix}Password') or request.form.get('password') or ''
        
        if email and password:
            return {'email': email, 'password': password}
        return None
    except Exception as e:
        logger.error(f"Error in get_auth_data: {e}")
        return None

def send_verification_email(email, code=None, is_resend=False, analysis=None):
    try:
        if not smtp_sender:
            if code:
                print(f"\n🔥 DEV MODE OTP for {email}: {code}\n")
            return False, "Email config missing"

        subject = 'PathFinders - New Code' if is_resend else 'PathFinders - Verify Email'
        
        if analysis:
            body_html = f"""
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #2c3e50; text-align: center;">🎯 Your Career Analysis</h2>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; overflow-x: auto;">
<pre>{json.dumps(analysis, indent=2)}</pre>
                </div>
                <p style="color: #7f8c8d; text-align: center;">Best,<br>PathFinders Team</p>
            </div>
            """
            return smtp_sender.send(email, subject, body_html, True)
        else:
            # Get latest token
            with app.app_context():
                token_obj = VerificationCode.query.filter_by(email=email).order_by(VerificationCode.id.desc()).first()
                token_url = f"http://localhost:5000/verify_email/{token_obj.token}" if token_obj else ""
            
            body_html = f"""
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #2c3e50;">🎉 Welcome to PathFinders!</h2>
                <div style="background: #e3f2fd; padding: 20px; border-radius: 8px;">
                    <h3 style="color: #1976d2;">Your Code:</h3>
                    <h1 style="font-size: 48px; color: #1976d2; text-align: center; letter-spacing: 5px;">{code}</h1>
                </div>
                <p><strong>⏰ Expires in 10 minutes</strong></p>
                <p>Or <a href="{token_url}" style="color: #1976d2; font-weight: bold;">click here to verify</a></p>
                <p style="color: #7f8c8d;">Need another? Use "Resend Code"</p>
            </div>
            """
            return smtp_sender.send(email, subject, body_html, True)

    except Exception as e:
        logger.error(f"Email error: {e}")
        if code:
            print(f"\n🔥 DEV MODE OTP for {email}: {code}\n")
        return False, str(e)

# 🔥 ALL ROUTES - COMPLETE
@app.errorhandler(BadRequestKeyError)
def handle_bad_request(e):
    flash('Invalid form data.')
    return redirect(url_for('register'))

@app.errorhandler(500)
def internal_error(error):
    logger.error(f"Server error: {error}")
    flash('Something went wrong. Try again.')
    return render_template('login.html'), 500

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        data = get_auth_data(request, 'login')
        if not data:
            flash('Missing credentials')
            return render_template('login.html')
        
        email, password = data['email'], data['password']
        
        if len(email) < 3 or '@' not in email:
            flash('Enter valid email')
            return render_template('login.html')
        
        if len(password) < 6:
            flash('Password too short')
            return render_template('login.html')
        
        user = User.query.filter_by(email=email).first()
        if user and check_password_hash(user.password_hash, password):
            if not user.is_verified:
                flash('Verify your email first or <a href="/resend_otp" style="color: #007bff;">resend code</a>')
                return render_template('login.html')
            login_user(user, remember=True)
            return redirect(url_for('dashboard'))
        
        flash('Invalid email/password')
    
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        data = get_auth_data(request, 'register')
        if not data:
            flash('Missing email/password')
            return render_template('login.html')
            
        email, password = data['email'], data['password']
        
        if len(email) < 3 or '@' not in email:
            flash('Enter valid email')
            return render_template('login.html')
        
        if len(password) < 8:
            flash('Password must be 8+ chars')
            return render_template('login.html')
        
        if User.query.filter_by(email=email).first():
            flash('Email already registered')
            return render_template('login.html')
        
        # Store pending signup
        session['pending_signup'] = {'email': email, 'password': password}
        session['show_verification'] = True
        session.modified = True
        session.permanent = True  # Ensure persists across redirects
        
        # Create verification code - 6 DIGITS ONLY
        code = ''.join([str(secrets.randbelow(10)) for _ in range(6)])
        token = secrets.token_urlsafe(32)
        expires = datetime.now(timezone.utc) + timedelta(minutes=10)
        
        with app.app_context():
            vcode = VerificationCode(email=email, code=code, token=token, expires=expires)
            db.session.add(vcode)
            db.session.commit()
        
        success, msg = send_verification_email(email, code)
        
        if success:
            flash('✅ Code sent! Check email.')
        else:
            flash('⚠️ Check console for OTP!')
        
        return render_template('login.html', show_verification=True, pending_email=email)
    
    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('Logged out!')
    return redirect(url_for('index'))

@app.route('/verify_otp', methods=['POST'])
def verify_otp():
    try:
        code = request.form.get('code', '').replace(' ', '').upper()
        if len(code) != 6:
            flash('Enter 6-digit code')
            return render_template('login.html')
        
        pending = session.get('pending_signup')
        if not pending:
            flash('No pending signup. Register again.')
            return redirect(url_for('register'))
        
        email = pending['email']
        
        with app.app_context():
            latest_code = VerificationCode.query.filter(
                VerificationCode.email == email,
                VerificationCode.expires > datetime.now(timezone.utc)
            ).order_by(VerificationCode.id.desc()).first()
        
        if not latest_code or latest_code.code != code:
            flash('❌ Invalid/expired code. <a href="/resend_otp" class="btn btn-sm btn-primary">Resend</a>')
            return render_template('login.html')
        
        # Create user
        user = User(
            email=email,
            password_hash=generate_password_hash(pending['password']),
            is_verified=True
        )
        db.session.add(user)
        db.session.delete(latest_code)
        db.session.commit()
        
        login_user(user, remember=True)
        session.clear()
        flash('🎉 Welcome to PathFinders!')
        return redirect(url_for('dashboard'))
        
    except Exception as e:
        logger.error(f"Verify OTP error: {e}")
        flash('Verification failed')
        return render_template('login.html')

@app.route('/resend_otp', methods=['POST'])
def resend_otp():
    try:
        email = request.form.get('email') or session.get('pending_signup', {}).get('email')
        if not email:
            flash('No pending verification')
            return redirect(url_for('register'))
        
        with app.app_context():
            VerificationCode.query.filter_by(email=email).delete()
            db.session.commit()
            
            code = ''.join([str(secrets.randbelow(10)) for _ in range(6)])  # 6 DIGITS ONLY
            token = secrets.token_urlsafe(32)
            expires = datetime.now(timezone.utc) + timedelta(minutes=10)
            vcode = VerificationCode(email=email, code=code, token=token, expires=expires)
            db.session.add(vcode)
            db.session.commit()
        
        success, msg = send_verification_email(email, code, is_resend=True)
        flash('✅ New code sent!' if success else '⚠️ Check console for OTP!')
        return render_template('login.html', show_verification=True, pending_email=email)
        
    except Exception as e:
        logger.error(f"Resend error: {e}")
        flash('Resend failed')
        return render_template('login.html')

@app.route('/verify_email/<token>')
def verify_email(token):
    try:
        with app.app_context():
            vcode = VerificationCode.query.filter_by(token=token).filter(
                VerificationCode.expires > datetime.now(timezone.utc)
            ).first()
        
        if not vcode:
            flash('❌ Invalid/expired link')
            return render_template('login.html')
        
        email = vcode.email
        user = User.query.filter_by(email=email).first()
        
        if user:
            user.is_verified = True
            flash('✅ Email verified!')
        else:
            pending = session.get('pending_signup')
            if pending and pending['email'] == email:
                password = pending['password']
                user = User(email=email, password_hash=generate_password_hash(password), is_verified=True)
                db.session.add(user)
                flash('🎉 Account created!')
            else:
                flash('No pending registration')
                db.session.delete(vcode)
                db.session.commit()
                return render_template('login.html')
        
        db.session.delete(vcode)
        db.session.commit()
        login_user(user, remember=True)
        return redirect(url_for('dashboard'))
        
    except Exception as e:
        logger.error(f"Verify email error: {e}")
        flash('Verification failed')
        return render_template('login.html')

@app.route('/dashboard', methods=['GET', 'POST'])
@login_required
def dashboard():
    try:
        if request.method == 'POST':
            answers = {q['id']: request.form.get(q['id'], '')[:1000] 
                      for q in CAREER_ASSESSMENT_QUESTIONS}
            
            analysis = analyze_career_assessment(answers)
            
            assessments = json.loads(current_user.assessments or '[]')
            assessments.append({
                'date': datetime.now(timezone.utc).isoformat(),
                'analysis': analysis
            })
            current_user.assessments = json.dumps(assessments[-10:])
            db.session.commit()
            
            session['latest_analysis'] = analysis
            flash('🎯 Analysis saved!')
            return redirect(url_for('connect'))
        
        return render_template('dashboard.html', questions=CAREER_ASSESSMENT_QUESTIONS)
    except Exception as e:
        logger.error(f"Dashboard error: {e}")
        flash('Assessment failed')
        return render_template('dashboard.html', questions=CAREER_ASSESSMENT_QUESTIONS)

@app.route('/connect')
@login_required
def connect():
    analysis = session.get('latest_analysis', {})
    return render_template('connect.html', analysis=analysis)

@app.route('/send_email')
@login_required
def send_email():
    try:
        analysis = session.get('latest_analysis', {})
        if not analysis:
            flash('No analysis to send')
            return redirect(url_for('connect'))
        
        success, msg = send_verification_email(current_user.email, analysis=analysis)
        flash('📧 Analysis sent!' if success else 'Email failed - check dashboard')
        return redirect(url_for('connect'))
    except Exception as e:
        flash('Send failed')
        return redirect(url_for('connect'))

if __name__ == '__main__':
    print("🚀 PathFinders ready! http://localhost:5000")
    print("📧 Port 465 SMTP | 🎯 Gemini AI | ✅ All fixed!")
    app.run(host='0.0.0.0', port=5000, debug=True)