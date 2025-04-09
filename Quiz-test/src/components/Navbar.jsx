import "../styles/MainPage.css";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the JWT token from cookies
    Cookies.remove('access_token');
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-buttons">
        <button>Strona Główna</button>
        <button>Ranking</button>
        <button>Mój Profil</button>
        <button onClick={handleLogout}>Wyloguj się</button>
      </div>
    </nav>
  );
}

export default Navbar;