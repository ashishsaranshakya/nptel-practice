import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ResultScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { score, totalQuestions } = location.state;

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="result-screen">
      <h1>Quiz Finished!</h1>
      <p>Your score: {score}/{totalQuestions}</p>
      <button onClick={goToHome}>Back to Home</button>
    </div>
  );
};

export default ResultScreen;
