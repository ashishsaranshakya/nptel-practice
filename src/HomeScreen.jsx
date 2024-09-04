import React from 'react';
import { useNavigate } from 'react-router-dom';
import quizData from './assets/questions.json';

const HomeScreen = () => {
  const navigate = useNavigate();

  const startQuiz = (chapterId) => {
    navigate(`/quiz/${chapterId}`);
  };

  const startOverallQuiz = () => {
    navigate(`/overall-quiz`);
  };

  return (
    <div className="home-screen">
      <h1>Welcome to the NPTEL Practice App</h1>
      <button onClick={startOverallQuiz}>Start Overall Quiz</button>
      {quizData.map((chapter, index) => (
        <button key={index} onClick={() => startQuiz(index)}>
          Start Quiz for Chapter {index + 1}
        </button>
      ))}
    </div>
  );
};

export default HomeScreen;
