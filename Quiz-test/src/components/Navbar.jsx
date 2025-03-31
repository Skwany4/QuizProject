import "../styles/MainPage.css";
import { useNavigate } from "react-router-dom";
function Navbar() {

  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile");
  };
  const handleLeaderboardClick = () => {
    navigate("/leaderboard");
  };

  return (
    <nav className="navbar">
      <div className="nav-buttons">
        <button>Strona Główna</button>
        <button onClick={handleLeaderboardClick}>Ranking</button>
        <button onClick={handleProfileClick}>Mój Profil</button>
        <button>Wyloguj się</button>
      </div>
    </nav>
  );
}

export default Navbar;
