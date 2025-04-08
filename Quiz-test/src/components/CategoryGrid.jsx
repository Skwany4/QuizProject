import React, { useState } from "react";
import "../styles/MainPage.css";
import QuizModal from "./QuizModal";

const categories = [
  { id: 1, name: "Kategoria", img: "Category.png", description: "Description for Kategoria 1" },
  { id: 2, name: "Kategoria", img: "Category.png", description: "Description for Kategoria 2" },
  { id: 3, name: "Kategoria", img: "Category.png", description: "Description for Kategoria 3" },
  { id: 4, name: "Kategoria", img: "Category.png", description: "Description for Kategoria 4" },
  { id: 5, name: "Kategoria", img: "Category.png", description: "Description for Kategoria 5" },
  { id: 6, name: "Kategoria", img: "Category.png", description: "Description for Kategoria 6" },
  { id: 7, name: "Kategoria", img: "Category.png", description: "Description for Kategoria 7" },
  { id: 8, name: "Kategoria", img: "Category.png", description: "Description for Kategoria 8" },
  { id: 9, name: "Kategoria", img: "Category.png", description: "Description for Kategoria 9" },
  { id: 10, name: "Kategoria", img: "Category.png",description: "Description for Kategoria 10" },
  { id: 11, name: "Kategoria", img: "Category.png",description: "Description for Kategoria 11" },
  { id: 12, name: "Kategoria", img: "Category.png",description: "Description for Kategoria 12" },
];

function CategoryGrid() {
  const [selectedCategory, setSelectedCategory] = useState(null);

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
          <img src={`/public/${category.img}`} alt={category.name} />
          <button onClick={() => handleCategoryClick(category)} className="category-button">
            {category.name}
          </button>
        </div>
      ))}
      <QuizModal category={selectedCategory} onClose={handleCloseModal} />
    </div>
  );
}

export default CategoryGrid;
