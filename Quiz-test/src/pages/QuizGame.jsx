// importowanie bibliotek, komponentów i stylów
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../styles/QuizGame.css';

// stworzenie komponentu QuizGame
function QuizGame() {
  const { categoryId } = useParams(); // Pobranie ID kategorii z parametrów URL
  const navigate = useNavigate(); // Hook do nawigacji
  const [questions, setQuestions] = useState([]); // Stan do przechowywania pytań
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Stan do przechowywania indeksu aktualnego pytania
  const [score, setScore] = useState(0); // Stan do przechowywania wyniku
  const [gameEnded, setGameEnded] = useState(false); // Stan do przechowywania informacji o zakończeniu gry
  const [loading, setLoading] = useState(true); // Stan do przechowywania informacji o ładowaniu pytań
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Stan do przechowywania wybranej odpowiedzi
  const [isProcessingAnswer, setIsProcessingAnswer] = useState(false); // Stan do przechowywania informacji o przetwarzaniu odpowiedzi
  const [timeElapsed, setTimeElapsed] = useState(0); // Stan do przechowywania czasu rozgrywki

  const currentQuestionIndexRef = useRef(currentQuestionIndex); // Referencja do aktualnego indeksu pytania
  const questionsRef = useRef(questions); // Referencja do pytań
  const isProcessingAnswerRef = useRef(isProcessingAnswer); // Referencja do przetwarzania odpowiedzi

  useEffect(() => { // Synchronizacja referencji z aktualnym stanem
    currentQuestionIndexRef.current = currentQuestionIndex;
    questionsRef.current = questions;
    isProcessingAnswerRef.current = isProcessingAnswer;
  }, [currentQuestionIndex, questions, isProcessingAnswer]);

  useEffect(() => { // Ustawienie interwału do zliczania czasu rozgrywki
    const timer = setInterval(() => {
      if (!gameEnded) {
        setTimeElapsed(prev => prev + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [gameEnded]);

  const handleAnswerClick = useCallback((selectedIndex) => { // Funkcja do obsługi kliknięcia w odpowiedź
    if (isProcessingAnswerRef.current) return;
    
    setIsProcessingAnswer(true);
    setSelectedAnswer(selectedIndex);

    setTimeout(() => { // Funkcja do opóźnienia przetwarzania odpowiedzi
      const currentIdx = currentQuestionIndexRef.current;
      const currentQuestions = questionsRef.current;

      if (selectedIndex === currentQuestions[currentIdx]?.correct_index) { // Sprawdzenie, czy odpowiedź jest poprawna
        setScore(prev => prev + 1); // Zwiększenie wyniku o 1
      }

      if (currentIdx < currentQuestions.length - 1) { // Jeśli nie jest to ostatnie pytanie
        setCurrentQuestionIndex(prev => prev + 1); // Przejdź do następnego pytania
      } else {
        setGameEnded(true);
      }

      setSelectedAnswer(null);
      setIsProcessingAnswer(false);
    }, 1500);
  }, []);

  useEffect(() => { // Pobranie pytań z serwera po załadowaniu komponentu
    setLoading(true);
    fetch(`http://localhost:5000/questions/${categoryId}`) // Pobranie pytań z serwera
      .then(response => {
        if (!response.ok) throw new Error('No questions found');
        return response.json();
      })
      .then(data => { // Sprawdzenie, czy pytania są dostępne
        if (data.length === 0) navigate('/');
        setQuestions(data);
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
        navigate('/main');
      })
      .finally(() => setLoading(false));
  }, [categoryId, navigate]);

  const submitScore = async () => { // Funkcja do przesyłania wyniku na serwer
    try {
      const token = Cookies.get('access_token');
      if (!token) {
        console.error('No token found');
        return;
      }
      await axios.post('http://localhost:5000/submit_score', // Przesyłanie wyniku na serwer
        { correct_answers: score },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('Score submitted successfully');
    } catch (error) {
      console.error('Error submitting score:', error);
    }
  };

  const handleReturnHome = async () => { // Funkcja do obsługi powrotu do strony głównej
    await submitScore();
    navigate('/main');
  };

  if (loading) { // Sprawdzenie, czy pytania są ładowane
    return <div className="loading">Ładowanie...</div>;
  }

  if (gameEnded) { // Sprawdzenie, czy gra się zakończyła
    return (
      <div className="result-modal">
        <h2>Koniec!</h2>
        <p class="modal-p">Wynik: {score}/{questions.length}</p>
        <button onClick={handleReturnHome}>Powrót do strony głównej</button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return ( // Renderowanie komponentu gry
    
    <div className="quiz-game-container">
      <div className="timer">
        Czas rozgrywki: {Math.floor(timeElapsed / 60).toString().padStart(2, '0')}:
        {(timeElapsed % 60).toString().padStart(2, '0')}
      </div>

      <div className="progress-bars"><br /><br />
        <div className="progress-container">
          <div 
            className="progress-bar question-progress"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          ></div>
          <div className="progress-text">
            Pytanie {currentQuestionIndex + 1} z {questions.length}
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

      <div className="current-score">Wynik: {score}</div>
    </div>
  );
}

export default QuizGame;