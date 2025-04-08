import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/QuizModal.css';

function QuizModal({ category, onClose }) {
  const navigate = useNavigate();

  if (!category) return null;

  const startCompetition = () => {
    navigate(`/quiz/${category.id}`);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{category.name}</h2>
        <p>{category.description}</p>
        <button className="start-quiz-button" onClick={startCompetition}>Start Competition</button>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default QuizModal;