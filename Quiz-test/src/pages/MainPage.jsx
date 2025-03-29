import Navbar from "../components/Navbar";
import CategoryGrid from "../components/CategoryGrid";
import "../styles/MainPage.css";

function MainPage() {
  return (
    <div className="home-container">
      <Navbar />
      <CategoryGrid />
    </div>
  );
}

export default MainPage;
