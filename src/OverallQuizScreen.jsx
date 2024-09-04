import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import quizData from './assets/questions.json';

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const OverallQuizScreen = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Combine all questions from all chapters
    const allQuestions = quizData.flat();
    const shuffledQuestions = allQuestions.map((question) => ({
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

  return (
    <div className="quiz-screen">
      <button onClick={goToHome} className="back-to-home-button">
        Back to Home
      </button>

      {isFinished ? (
        <div>
          <h1>Quiz Finished!</h1>
          <p>Your score: {score}/{questions.length}</p>
          <button onClick={goToHome}>Back to Home</button>
        </div>
      ) : (
        questions.length > 0 && (
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
                      aria-label={option}
                    />
                    {option}
                  </label>
                </div>
              ))}
            </form>
            <button
              onClick={handleSubmit}
              disabled={!selectedOption}
              aria-label={currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Submit Quiz'}
            >
              {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit'}
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default OverallQuizScreen;
