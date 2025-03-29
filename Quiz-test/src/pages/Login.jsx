import { Link } from "react-router-dom";
import "../styles/auth.css";

function Login() {
  return (
    <div className ="auth-body">
    <div className="auth-container">
      <h2>Logowanie</h2>
      <form>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Hasło" required />
        <button type="submit">Zaloguj</button>
      </form>
      <p>Nie masz konta? <Link to="/register">Zarejestruj się</Link></p>
    </div>
    </div>
  );
}

export default Login;
