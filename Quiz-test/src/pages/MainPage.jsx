import Navbar from "../components/Navbar";
import CategoryGrid from "../components/CategoryGrid";
import "../styles/MainPage.css";


// stworzenie komponentu MainPage
function MainPage() {

// Użycie komponentu Navbar i CategoryGrid do stworzenia strony głównej
  return (
    <div className="home-container">
      <Navbar />
      <CategoryGrid />
    </div>
  );
}

export default MainPage;
