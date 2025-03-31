import { useState, useEffect } from "react";
import "../styles/Leaderboard.css";

function Leaderboard() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Fetch the top 10 players data (mock data used here)
    const fetchPlayers = async () => {
      const response = await fetch("/api/players/top10");
      const data = await response.json();
      setPlayers(data);
    };

    fetchPlayers();
  }, []);

  return (
    <div className="leaderboard-container">
      <h1>Top 10 Players</h1>
      <ul>
        {players.map((player, index) => (
          <li key={index} className="player-item">
            <span className="player-rank">#{index + 1}</span>
            <span className="player-name">{player.name}</span>
            <span className="player-score">{player.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;