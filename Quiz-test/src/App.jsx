import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainPage from "./pages/MainPage";
import QuizGame from './pages/QuizGame';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Main" element={<MainPage />} />
        <Route path="/quiz/:categoryId" element={<QuizGame />} />
      </Routes>
    </Router>
  );
}

export default App;
