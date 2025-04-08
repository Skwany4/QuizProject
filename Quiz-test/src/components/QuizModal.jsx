import React from 'react';
import '../styles/QuizModal.css';

function QuizModal({ category, onClose }) {
  if (!category) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{category.name}</h2>
        <p>{category.description}</p>
        <button className="start-quiz-button">Start Competition</button>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default QuizModal;