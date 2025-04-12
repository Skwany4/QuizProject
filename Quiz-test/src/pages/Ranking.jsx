import { useEffect, useState } from "react";
import "../styles/Ranking.css"; // New CSS file for styling

function Ranking() {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await fetch("http://localhost:5000/ranking");
        if (!response.ok) {
          throw new Error("Failed to fetch ranking");
        }
        const data = await response.json();
        setRanking(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRanking();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="ranking-container">
      <h1 className="ranking-title">10 najlepszych użytkowników</h1>
      <table className="ranking-table">
        <thead>
          <tr>
            <th>Pozycja</th>
            <th>Nazwa użytkownika</th>
            <th>Punkty</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((user, index) => (
            <tr key={user.username}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Ranking;