import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Profile.css";

function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Use localhost consistently if your CORS allowed origin is http://localhost:5173
        const response = await fetch('http://localhost:5000/profile', {
          credentials: 'include'
        });
  
        if (!response.ok) {
          if (response.status === 401) navigate('/login');
          throw new Error('Failed to fetch profile');
        }
  
        const data = await response.json();
        setUsername(data.username);
        setEmail(data.email);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, [navigate]);
  
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
        <div className="profile-card">
          <img src="https://via.placeholder.com/100" alt="Profile" className="profile-pic" />
          <h2>{username}</h2>
          <p>Email: {email}</p>
          {/* Static join date as in original code */}
          <p>Dołączył: Styczeń 2023</p>
        </div>

        <div className="profile-section">
          <h3>Edytuj dane</h3>
          <form onSubmit={handleSave}>
            <label>
              Nazwa użytkownika:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
