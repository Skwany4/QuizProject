import "../styles/MainPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Navbar() {

  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile");
  };
  const handleLeaderboardClick = () => {
    navigate("/leaderboard");
  };
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/logout"); // Call the logout endpoint
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  return (
    <nav className="navbar">
      <div className="nav-buttons">
        <button>Strona Główna</button>
        <button onClick={handleLeaderboardClick}>Ranking</button>
        <button onClick={handleProfileClick}>Mój Profil</button>
        <button onClick={handleLogout}>Wyloguj się</button>
      </div>
    </nav>
  );
}

export default Navbar;
