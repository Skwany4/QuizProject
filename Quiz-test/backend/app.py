#importowanie bibliotek
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from pymongo import MongoClient
from datetime import datetime
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

# Inicjalizacja Flaska
app = Flask(__name__)
app.secret_key = "Z{E#j&>H<N17xV`inN25U~fV(/oTK/"
app.config['JWT_SECRET_KEY'] = "Z{E#j&>H<N17xV`inN25U~fV(/oTK/"  

# Inizjalizacja JWT 
jwt = JWTManager(app)

# Konfiguracja CORS
CORS(
    app,
    supports_credentials=True,
    origins=["http://localhost:5173"],
    allow_headers=["Content-Type", "Authorization"]
)

# Konfiguracja MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["quizproject"]
users_collection = db["users"]

# ścieżka odpowiedzialna za rejestrację użytkownika
@app.route('/register', methods=['POST'])
def register():
    username = request.json['username']
    email = request.json['email']
    password = generate_password_hash(request.json['password'], method='pbkdf2:sha256') #haszowanie hasła
    
    users_collection.insert_one({
        "username": username,
        "email": email,
        "password": password,
        "points": 0,
        "date_of_creation": datetime.now()
    })
    return jsonify({"message": "User registered successfully"}), 201

# ścieżka odpowiedzialna za logowanie użytkownika
@app.route('/login', methods=['POST'])
def login():
    email = request.json['email']
    password = request.json['password']
    
    user = users_collection.find_one({"email": email})
    if user and check_password_hash(user['password'], password):
        access_token = create_access_token(identity=user['username'])
        return jsonify({"message": "Login successful", "access_token": access_token}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401

# ścieżka odpowiedzialna za pobranie wszystkich kategorii z bazy danych
@app.route('/categories', methods=['GET'])
def get_categories():
    categories = list(db["categories"].find({}, {"_id": 0}))
    return jsonify(categories), 200

# ścieżka odpowiedzialna za pobranie pytań z danej kategorii
@app.route('/questions/<int:category_id>', methods=['GET'])
def get_questions(category_id):
    questions = list(db["questions"].aggregate([
        {"$match": {"category_id": category_id}},
        {"$sample": {"size": 5}},
        {"$project": {
            "_id": 0,
            "category_id": 1,
            "question": 1,
            "answers": 1,
            "correct_index": 1
        }}
    ]))
    return jsonify(questions), 200
# ścieżka odpowiedzialna za dodanie punktów dla użytkownika
@app.route('/submit_score', methods=['POST'])
@jwt_required()
def submit_score():
    username = get_jwt_identity()
    correct_answers = request.json.get('correct_answers')
    
    # sprawdzanie poprawności danych 
    if not isinstance(correct_answers, int) or correct_answers < 0 or correct_answers > 5:
        return jsonify({"message": "Invalid number of correct answers"}), 400
    
    #obliczanie punktów do dodania
    points_to_add = correct_answers * 10
    if correct_answers == 5:
        points_to_add += 10
    
    # aktualizacja punktów w bazie danych
    user = users_collection.find_one({"username": username})
    if user:
        current_points = user['points']
        new_points = current_points + points_to_add
        users_collection.update_one({"username": username}, {"$set": {"points": new_points}})
        return jsonify({
            "message": "Points updated successfully",
            "points_added": points_to_add,
            "total_points": new_points
        }), 200
    else:
        return jsonify({"message": "User not found"}), 404


# ścieżka odpowiedzialna za pobranie rankingu użytkowników
@app.route('/ranking', methods=['GET'])
def get_ranking():
    top_users = list(users_collection.find({}, {"_id": 0, "username": 1, "points": 1}).sort("points", -1).limit(10))
    return jsonify(top_users), 200

# ścieżka odpowiedzialna za pobranie informacji o użytkowniku
@app.route('/user', methods=['GET'])
@jwt_required()
def get_user_info():
    username = get_jwt_identity() #pobranie danych z tokena JWT
    user = users_collection.find_one({"username": username}, {"_id": 0, "password": 0})  # wykluczenie hasła i id
    if user:
        return jsonify(user), 200
    else:
        return jsonify({"message": "User not found"}), 404
# ścieżka odpowiedzialna za edytowanie informacji o użytkowniku    
@app.route('/user/edit', methods=['POST'])
@jwt_required()
def edit_user_info():
    username = get_jwt_identity() 
    data = request.json 

    # Sprawdzenie, czy użytkownik podał nowe dane do aktualizacji
    new_username = data.get('username')
    new_email = data.get('email')
    new_password = data.get('password')

    if not any([new_username, new_email, new_password]):
        return jsonify({"message": "No fields to update"}), 400

    # Sprawdzanie poprawności nowych danych
    update_fields = {}
    if new_username:
        update_fields['username'] = new_username
    if new_email:
        update_fields['email'] = new_email
    if new_password:
        update_fields['password'] = generate_password_hash(new_password, method='pbkdf2:sha256')

    # Zaktualizowanie danych w bazie danych
    result = users_collection.update_one(
        {"username": username},  # Match the current user
        {"$set": update_fields}  # Update the fields
    )

    if result.modified_count > 0:
        return jsonify({"message": "Pomyślne zaaktualizowano dane!"}), 200
    else:
        return jsonify({"message": "Nie wprowowadzono żadnych zmian"}), 400    
    
if __name__ == '__main__':
    app.run(debug=True)