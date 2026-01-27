from flask import Flask, render_template, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3
import smtplib
import random
from email.message import EmailMessage

app = Flask(__name__)
app.secret_key = "super-secret-key"




EMAIL_ADDRESS = "muhammedtesleemolatundun@gmail.com"          
EMAIL_PASSWORD = "bwawzioqqfhkidup"           

SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587


@app.route("/")
def home():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)
