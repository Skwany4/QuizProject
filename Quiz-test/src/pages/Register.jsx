import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";

function Register() { // Komponent rejestracji
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => { // Funkcja do obsługi wysyłania formularza rejestracji
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Hałsła się nie zgadzają"); // Sprawdzenie, czy hasła się zgadzają
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/register", { // Wysłanie danych rejestracji do serwera
        username,
        email,
        password,
      });
      if (response.status === 201) {
        navigate("/login"); // przekierowanie do strony logowania po udanej rejestracji
      }
    } catch {
      setError("Registration failed");
    }
  };

  return (
    <div className="auth-body">
      <div className="auth-container">
        <h2>Rejestracja</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nazwa użytkownika"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Hasło"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Powtórz hasło"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit">Zarejestruj</button>
        </form>
        {error && <p className="error">{error}</p>}
        <p>
          Masz już konto? <Link to="/login">Zaloguj się</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;