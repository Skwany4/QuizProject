// importowanie bibliotek, komponentów i stylów
import React, { useState, useEffect } from "react";
import "../styles/Profile.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

// stworzenie komponentu Profile
function Profile() {
  const [userData, setUserData] = useState({ // Stan do przechowywania danych użytkownika
    username: "",
    email: "",
    points: 0,
    date_of_creation: "",
  });
  const [isEditing, setIsEditing] = useState(false); // Stan do przechowywania informacji o edytowaniu profilu
  const [formData, setFormData] = useState({ // Stan do przechowywania danych formularza
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate(); // Hook do nawigacji

  useEffect(() => { // Pobranie danych użytkownika po załadowaniu komponentu
    const token = Cookies.get("access_token"); // Sprawdzenie, czy token istnieje
    if (!token) { // Jeśli nie ma tokena, przekieruj do strony logowania
      navigate("/login");
      return;
    }

    fetch("http://localhost:5000/user", { // Pobranie danych użytkownika
      headers: {
        Authorization: `Bearer ${token}`, // Dodanie tokena do nagłówków
      },
    })
      .then((res) => { // Sprawdzenie odpowiedzi serwera
        if (res.status === 401) {
          navigate("/login");
        } else if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
        return res.json();
      })
      .then((data) => { // Ustawienie danych użytkownika w stanie
        setUserData({
          username: data.username,
          email: data.email,
          points: data.points,
          date_of_creation: new Date(data.date_of_creation).toLocaleDateString(),
        });
        setFormData({ username: data.username, email: data.email, password: "" }); // Ustawienie danych formularza na podstawie danych użytkownika
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  }, [navigate]);

  const handleInputChange = (e) => { // Funkcja do obsługi zmiany danych w formularzu
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditToggle = () => { // Funkcja do przełączania trybu edycji
    setIsEditing((prev) => !prev);
  };

  const handleSave = () => { // Funkcja do zapisywania zmian w formularzu
    const token = Cookies.get("access_token");
    fetch("http://localhost:5000/user/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData), // Wysłanie danych formularza do serwera
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update user data");
        }
        return res.json();
      })
      .then((data) => { // Sprawdzenie odpowiedzi serwera
        if (data.message === "User information updated successfully") {
          alert("User information updated successfully!");
          setUserData((prevData) => ({
            ...prevData,
            username: formData.username,
            email: formData.email,
          }));
          setIsEditing(false);
        } else {
          alert("Failed to update user information.");
        }
      })
      .catch((err) => {
        console.error("Error updating user data:", err);
      });
  };

  const handleReturnToMain = () => { // Funkcja do powrotu do strony głównej
    navigate("/Main");
  };
// Renderowanie komponentu
  return (
    <div className="profile-container">
      <h1>Mój Profil</h1>
      {!isEditing ? (
        <>
          <div className="profile-info">
            <p><strong>Nazwa użytkownika:</strong> {userData.username}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Punkty:</strong> {userData.points}</p>
            <p><strong>Konto stworzono::</strong> {userData.date_of_creation}</p>
          </div>
          <button className="edit-button" onClick={handleEditToggle}>
            Edytuj konto
          </button>
          <button className="return-button" onClick={handleReturnToMain}>
            Powrót do strony głównej
          </button>
        </>
      ) : (
        <div className="edit-form">
          <label>
            Nazwa użytkownika:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Hasło:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Nowe hasło"
            />
          </label>
          <div className="form-buttons">
            <button onClick={handleSave}>Zapisz zmiany</button>
            <button onClick={handleEditToggle}>Anuluj</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile; 