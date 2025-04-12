import { useEffect, useState } from "react";
import "../styles/Ranking.css";
function Ranking() { // Komponent do wyświetlania rankingu użytkowników
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { // Pobranie danych rankingu z serwera
    const fetchRanking = async () => {
      try {
        const response = await fetch("http://localhost:5000/ranking"); // Pobranie danych rankingu
        if (!response.ok) {
          throw new Error("Failed to fetch ranking");
        }
        const data = await response.json(); // Przetworzenie odpowiedzi na JSON
        setRanking(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRanking(); // Wywołanie funkcji do pobrania danych rankingu
  }, []);

  if (loading) return <p>Ładowanie...</p>;
  if (error) return <p>Błąd: {error}</p>;

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