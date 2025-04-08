import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/QuizGame.css';

function QuizGame() {
  const { categoryId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex] = useState(0); // Commented out setCurrentQuestionIndex to avoid ESLint error
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    // Placeholder for fetching questions based on categoryId
    const fetchedQuestions = [
      { question: 'Question 1?', answers: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'], correct: 0 },
      // Add more placeholder questions here
    ];
    setQuestions(fetchedQuestions);
  }, [categoryId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAnswerClick = () => {
    // Placeholder for answer click handling
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-game-container">
      {currentQuestion && (
        <>
          <div className="question-description">{currentQuestion.question}</div>
          <div className="answers-container">
            {currentQuestion.answers.map((answer, index) => (
              <button key={index} className="answer-button" onClick={handleAnswerClick}>
                {answer}
              </button>
            ))}
          </div>
          <div className="timer-container">
            <div className="progress-bar" style={{ width: `${(timer / 30) * 100}%` }}></div>
            <div className="timer">{timer}s</div>
          </div>
          <div className="game-progression">
            {currentQuestionIndex + 1}/{questions.length} questions
          </div>
        </>
      )}
    </div>
  );
}

export default QuizGame;