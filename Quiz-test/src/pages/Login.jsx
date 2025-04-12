// importowanie bibliotek, komponentów i stylów
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import "../styles/auth.css";

// stworzenie komponentu Login
function Login() {
  const [email, setEmail] = useState(""); // Stan do przechowywania adresu e-mail
  const [password, setPassword] = useState(""); // Stan do przechowywania hasła
  const [error, setError] = useState(""); // Stan do przechowywania błędów
  const navigate = useNavigate(); // Hook do nawigacji

  const handleSubmit = async (e) => { // Funkcja do obsługi wysyłania formularza
    e.preventDefault(); // Zapobiega domyślnemu działaniu formularza
    try {
      const response = await axios.post("http://localhost:5000/login", { // Wysłanie danych logowania do serwera
        email,
        password,
      });
      if (response.status === 200) {
        // Jeśli logowanie się powiodło, zapisz token w ciasteczkach i przekieruj do strony głównej
        Cookies.set('access_token', response.data.access_token, { expires: 7 }); // Ustawienie tokena w ciasteczkach na 7 dni
        navigate("/main");
      }
    } catch {
      setError("Niepoprawne dane logowania"); // Ustawienie błędu, jeśli logowanie się nie powiodło
    }
  };
  // Renderowanie komponentu
  return (
    <div className="auth-body">
      <div className="auth-container">
        <h2>Logowanie</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Aktualizacja stanu e-maila
          />
          <input
            type="password"
            placeholder="Hasło"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Aktualizacja stanu hasła
          />
          <button type="submit">Zaloguj</button>
        </form>
        {error && <p className="error">{error}</p>}
        <p>
          Nie masz konta? <Link to="/register">Zarejestruj się</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;