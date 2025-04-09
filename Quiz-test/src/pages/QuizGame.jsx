import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/QuizGame.css';

function QuizGame() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isProcessingAnswer, setIsProcessingAnswer] = useState(false);

  const currentQuestionIndexRef = useRef(currentQuestionIndex);
  const questionsRef = useRef(questions);
  const selectedAnswerRef = useRef(selectedAnswer);
  const isProcessingAnswerRef = useRef(isProcessingAnswer);

  useEffect(() => {
    currentQuestionIndexRef.current = currentQuestionIndex;
    questionsRef.current = questions;
    isProcessingAnswerRef.current = isProcessingAnswer;
  }, [currentQuestionIndex, questions, isProcessingAnswer]);

  useEffect(() => {
    selectedAnswerRef.current = selectedAnswer;
  }, [selectedAnswer]);

  const handleAnswerClick = useCallback((selectedIndex) => {
    if (isProcessingAnswerRef.current) return;
    
    setIsProcessingAnswer(true);
    setSelectedAnswer(selectedIndex);

    setTimeout(() => {
      const currentIdx = currentQuestionIndexRef.current;
      const currentQuestions = questionsRef.current;

      if (selectedIndex === currentQuestions[currentIdx]?.correct_index) {
        setScore(prev => prev + 1);
      }

      if (currentIdx < currentQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setGameEnded(true);
      }

      setSelectedAnswer(null);
      setIsProcessingAnswer(false);
    }, 1500);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/questions/${categoryId}`)
      .then(response => {
        if (!response.ok) throw new Error('No questions found');
        return response.json();
      })
      .then(data => {
        if (data.length === 0) navigate('/');
        setQuestions(data);
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
        navigate('/main');
      })
      .finally(() => setLoading(false));
  }, [categoryId, navigate]);

  const handleReturnHome = () => {
    navigate('/main');
  };

  if (loading) {
    return <div className="loading">Loading questions...</div>;
  }

  if (gameEnded) {
    return (
      <div className="result-modal">
        <h2>Game Over!</h2>
        <p>Your score: {score}/{questions.length}</p>
        <button onClick={handleReturnHome}>Return to Home</button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-game-container">
      {currentQuestion && (
        <>
          <div className="progress-bars">
            <div className="progress-container">
              <div 
                className="progress-bar question-progress"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              ></div>
              <div className="progress-text">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
            </div>
          </div>

          <div className="question-description">
            {currentQuestion.question}
          </div>

          <div className="answers-container">
            {currentQuestion.answers.map((answer, index) => (
              <button
                key={index}
                className={`answer-button ${
                  selectedAnswer !== null && 
                  (index === currentQuestion.correct_index ? 'correct' : 
                  (index === selectedAnswer ? 'incorrect' : ''))
                }`}
                onClick={() => handleAnswerClick(index)}
                disabled={selectedAnswer !== null || isProcessingAnswer}
              >
                {answer}
              </button>
            ))}
          </div>

          <div className="current-score">Current Score: {score}</div>
        </>
      )}
    </div>
  );
}

export default QuizGame;