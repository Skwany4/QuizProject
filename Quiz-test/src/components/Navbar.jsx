// importowanie bibliotek, komponentów i stylów
import "../styles/MainPage.css";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

// stworzenie komponentu Navbar
function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Usunięcie tokena z ciasteczek i przekierowanie do strony logowania
    Cookies.remove('access_token');
    navigate("/login");
  };
  return (
    <nav className="navbar">
      <div className="nav-buttons">
        <button>Strona Główna</button>
        <button onClick={() => navigate("/ranking")}>Ranking</button>
        <button onClick={() => navigate("/profile")}>Mój Profil</button>
        <button onClick={handleLogout}>Wyloguj się</button>
      </div>
    </nav>
  );
}

export default Navbar;