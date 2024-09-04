import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import quizData from './assets/questions.json';

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const QuizScreen = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const shuffledQuestions = quizData.map((question) => ({
      ...question,
      options: shuffleArray([...question.options]),
    }));
    setQuestions(shuffleArray(shuffledQuestions));
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption('');
    } else {
      setIsFinished(true);
    }
  };

  const goToHome = () => {
    navigate('/');
  };

  if (isFinished) {
    navigate('/result', { state: { score, totalQuestions: questions.length } });
  }

  return (
    <div className="quiz-screen">
      <button onClick={goToHome} className="back-to-home-button">
        Back to Home
      </button>
      {questions.length > 0 && (
        <div>
          <h2>{questions[currentQuestionIndex].question}</h2>
          <form>
            {questions[currentQuestionIndex].options.map((option, index) => (
              <div key={index}>
                <label>
                  <input
                    type="radio"
                    value={option}
                    checked={selectedOption === option}
                    onChange={handleOptionChange}
                  />
                  {option}
                </label>
              </div>
            ))}
          </form>
          <button
            onClick={handleSubmit}
            disabled={!selectedOption}
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit'}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizScreen;
