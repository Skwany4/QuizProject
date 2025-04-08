from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

app.secret_key = "Z{E#j&>H<N17xV`inN25U~fV(/oTK/"

# CORS configuration
CORS(
    app,
    supports_credentials=True,
    origins=["http://localhost:5173"],
    allow_headers=["Content-Type", "Authorization"]
)

def create_connection():     #Połączenie z bazą danych
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
        return jsonify({"message": "Login successful", "user": user[1]}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401

if __name__ == '__main__':
    app.run(debug=True)
