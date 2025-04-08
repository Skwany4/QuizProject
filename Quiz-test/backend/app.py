from flask import Flask, request, jsonify, session
from flask_cors import CORS
from datetime import timedelta
import mysql.connector
from mysql.connector import Error
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

# Use a strong secret key for signing cookies
app.secret_key = "Z{E#j&>H<N17xV`inN25U~fV(/oTK/"

# CORS configuration to allow cookies
CORS(
    app,
    supports_credentials=True,
    origins=["http://localhost:5173"],
    allow_headers=["Content-Type", "Authorization"]
)


# Session configuration for client-side sessions
app.config['SESSION_COOKIE_SECURE'] = False  # Set to True in production (requires HTTPS)
app.config['SESSION_COOKIE_SAMESITE'] = "Lax"  # Prevent CSRF attacks
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=30)  # Set session lifetime to 30 minutes

def create_connection():
    connection = None
    try:
        connection = mysql.connector.connect(
            host="mysql.agh.edu.pl",
            user="szymonk2",
            password="0igX0rh5WKSXomwV",
            database="szymonk2"
        )
    except Error as e:
        print(f"The error '{e}' occurred")
    return connection

@app.route('/register', methods=['POST'])
def register():
    connection = create_connection()
    cursor = connection.cursor()
    username = request.json['username']
    email = request.json['email']
    password = generate_password_hash(request.json['password'], method='pbkdf2:sha256')
    cursor.execute("INSERT INTO users (username, email, password) VALUES (%s, %s, %s)", (username, email, password))
    connection.commit()
    cursor.close()
    connection.close()
    return jsonify({"message": "User registered successfully"}), 201

@app.route('/login', methods=['POST'])
def login():
    connection = create_connection()
    cursor = connection.cursor()
    email = request.json['email']
    password = request.json['password']
    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
    user = cursor.fetchone()
    cursor.close()
    connection.close()
    if user and check_password_hash(user[3], password):
        session['user_id'] = user[0]  # Store user ID in session
        session['username'] = user[1]  # Store username in session
        session.permanent = True  # Enable session expiration
        return jsonify({"message": "Login successful", "user": user[1]}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401

@app.route('/logout', methods=['POST'])
def logout():
    session.clear()  # Clear session data
    return jsonify({"message": "Logged out successfully"}), 200

@app.route('/profile', methods=['GET'])
def profile():
    if 'user_id' not in session:
        return jsonify({"message": "Unauthorized"}), 401
    
    user_id = session['user_id']
    connection = create_connection()
    cursor = connection.cursor()
    # Get only username and email from your current schema
    cursor.execute("SELECT username, email FROM users WHERE id = %s", (user_id,))
    user = cursor.fetchone()
    cursor.close()
    connection.close()

    if user:
        return jsonify({
            "username": user[0],
            "email": user[1]
        }), 200
    else:
        return jsonify({"message": "User not found"}), 404
if __name__ == '__main__':
    app.run(debug=True)