import React, { useState, useEffect } from "react";
import "../styles/MainPage.css";
import QuizModal from "./QuizModal";

function CategoryGrid() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    // Fetch categories from the backend
    fetch("http://localhost:5000/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleCloseModal = () => {
    setSelectedCategory(null);
  };

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