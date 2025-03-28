import { FaRegSmile } from "react-icons/fa";
import "../styles/MainPage.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-buttons">
        <button>Strona Główna</button>
        <button>Ranking</button>
        <button>Mój profil</button>
        <button>Wyloguj się</button>
      </div>
    </nav>
  );
}

export default Navbar;
