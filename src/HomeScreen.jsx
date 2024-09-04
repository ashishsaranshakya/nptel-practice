import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate('/quiz');
  };

  return (
    <div className="home-screen">
      <h1>Welcome to the Quiz App</h1>
      <button onClick={startQuiz}>Start Quiz</button>
    </div>
  );
};

export default HomeScreen;
