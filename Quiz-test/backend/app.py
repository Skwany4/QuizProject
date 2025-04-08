from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from pymongo import MongoClient
from datetime import datetime


app = Flask(__name__)
app.secret_key = "Z{E#j&>H<N17xV`inN25U~fV(/oTK/"

# CORS configuration
CORS(
    app,
    supports_credentials=True,
    origins=["http://localhost:5173"],
    allow_headers=["Content-Type", "Authorization"]
)

# MongoDB Configuration
client = MongoClient("mongodb://localhost:27017/")
db = client["quizproject"]
users_collection = db["users"]

@app.route('/register', methods=['POST'])
def register():
    username = request.json['username']
    email = request.json['email']
    password = generate_password_hash(request.json['password'], method='pbkdf2:sha256')
    
    # Insert user into MongoDB with default points and account creation date
    users_collection.insert_one({
        "username": username,
        "email": email,
        "password": password,
        "points": 0,  # Default points
        "date_of_creation": datetime.now()  # Current date and time
    })
    return jsonify({"message": "User registered successfully"}), 201
@app.route('/login', methods=['POST'])
def login():
    email = request.json['email']
    password = request.json['password']
    
    user = users_collection.find_one({"email": email})
    if user and check_password_hash(user['password'], password):
        return jsonify({"message": "Login successful", "user": user['username']}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401

if __name__ == '__main__':
    app.run(debug=True)