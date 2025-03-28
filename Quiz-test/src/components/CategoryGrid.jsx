import "../styles/MainPage.css";

const categories = [
  { id: 1, name: "Kategoria", img: "Category.png" },
  { id: 2, name: "Kategoria", img: "Category.png" },
  { id: 3, name: "Kategoria", img: "Category.png" },
  { id: 4, name: "Kategoria", img: "Category.png" },
  { id: 5, name: "Kategoria", img: "Category.png" },
  { id: 6, name: "Kategoria", img: "Category.png" },
  { id: 7, name: "Kategoria", img: "Category.png" },
  { id: 8, name: "Kategoria", img: "Category.png" },
  { id: 9, name: "Kategoria", img: "Category.png" },
  { id: 10, name: "Kategoria", img: "Category.png" },
  { id: 11, name: "Kategoria", img: "Category.png" },
  { id: 12, name: "Kategoria", img: "Category.png" },
  { id: 13, name: "Kategoria", img: "Category.png" },
  { id: 14, name: "Kategoria", img: "Category.png" },
  { id: 15, name: "Kategoria", img: "Category.png" },
  { id: 16, name: "Kategoria", img: "Category.png" },
];

function CategoryGrid() {
  return (
    <div className="grid-container">
      {categories.map((category) => (
        <div key={category.id} className="category-card">
          <img src={`/public/${category.img}`} alt={category.name} />
          <p>{category.name}</p>
        </div>
      ))}
    </div>
  );
}

export default CategoryGrid;
