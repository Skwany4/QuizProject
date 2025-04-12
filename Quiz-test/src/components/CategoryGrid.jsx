//importowanie bibliotek, komponentów i stylów
import React, { useState, useEffect } from "react";
import "../styles/MainPage.css";
import QuizModal from "./QuizModal";

//stworzenie komponentu CategoryGrid
function CategoryGrid() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    // Pobranie danych z serwera i ustawienie ich w stanie komponentu
    fetch("http://localhost:5000/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);
    // Funkcja do obsługi kliknięcia w kategorię
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
    // Funkcja do zamykania modala
  const handleCloseModal = () => {
    setSelectedCategory(null);
  };
   // Renderowanie komponentu
  return (
    <div className="grid-container">
      {categories.map((category) => (
        <div key={category.id} className="category-card">
          <img src={`http://localhost:5000/static/images/${category.img}`} alt={category.name} />
          <button
            onClick={() => handleCategoryClick(category)}
            className="category-button"
          >
            {category.name}
          </button>
        </div>
      ))}
      <QuizModal category={selectedCategory} onClose={handleCloseModal} />
    </div>
  );
}

export default CategoryGrid;