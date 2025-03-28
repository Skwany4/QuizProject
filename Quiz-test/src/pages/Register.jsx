import { Link } from "react-router-dom";
import "../styles/auth.css";

function Register() {
  return (
    <div className="auth-container">
      <h2>Rejestracja</h2>
      <form>
        <input type="text" placeholder="Nazwa użytkownika" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Hasło" required />
        <input type="password" placeholder="Powtórz hasło" required />
        <button type="submit">Zarejestruj</button>
      </form>
      <p>Masz już konto? <Link to="/login">Zaloguj się</Link></p>
    </div>
  );
}

export default Register;
