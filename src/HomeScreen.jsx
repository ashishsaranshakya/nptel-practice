import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import quizData from './assets/questions.json';

const HomeScreen = ({ count }) => {
  const navigate = useNavigate();

  const startQuiz = (chapterId) => {
    navigate(`/quiz/${chapterId}`);
  };

  const startOverallQuiz = () => {
    navigate(`/overall-quiz`);
  };

  const [selectedChapter, setSelectedChapter] = useState(0);

  const handleChapterChange = (event) => {
    setSelectedChapter(Number(event.target.value));
  };

  const handleStartQuiz = () => {
    startQuiz(selectedChapter);
  };

  return (
    <div className="home-screen">
      <h1>Welcome to the NPTEL Practice App</h1>
      <button onClick={startOverallQuiz}>Start Overall Quiz</button>

      <div className="chapter-select">
        <select value={selectedChapter} onChange={handleChapterChange}>
          {quizData.map((chapter, index) => (
            <option key={index} value={index}>
              Chapter {index + 1}
            </option>
          ))}
        </select>
        <button onClick={handleStartQuiz}>Start Quiz</button>
      </div>
      
      {count && <h3>Active Users This Hour: {count}</h3>}
    </div>
  );
};

export default HomeScreen;
