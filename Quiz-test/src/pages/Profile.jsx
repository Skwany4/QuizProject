import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Profile.css"; // Upewnij się, że ścieżka do pliku CSS jest poprawna

function Profile() {
  // Stan dla formularza edycji profilu
  const [name, setName] = useState("Jan Kowalski");
  const [email, setEmail] = useState("jan.kowalski@example.com");

  const handleSave = (e) => {
    e.preventDefault();
    alert("Dane zostały zapisane!");
  };

  return (
    <div className="home-container">
      <div className="navbar">
        <h1>Mój profil</h1>
      </div>
      <div className="profile-container">
        {/* Podstawowe informacje */}
        <div className="profile-card">
          <img src="https://via.placeholder.com/100" alt="Profile" className="profile-pic" />
          <h2>{name}</h2>
          <p>Email: {email}</p>
          <p>Dołączył: Styczeń 2023</p>
        </div>

        {/* Formularz do zmiany danych */}
        <div className="profile-section">
          <h3>Edytuj dane</h3>
          <form onSubmit={handleSave}>
            <label>
              Imię i nazwisko:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <button type="submit" className="category-button">Zapisz zmiany</button>
          </form>
        </div>

        {/* Statystyki quizów */}
        <div className="profile-section">
          <h3>Twoje statystyki</h3>
          <p>📊 Rozwiązane quizy: <strong>24</strong></p>
          <p>🏆 Najwyższy wynik: <strong>98%</strong></p>
          <p>⏳ Średni czas na quiz: <strong>5 min 30 sek</strong></p>
        </div>

        {/* Powrót do strony głównej */}
        <div className="profile-section">
          <Link to="/Main">
            <button className="category-button">Powrót do strony głównej</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;
