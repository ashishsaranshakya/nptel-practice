import { useState, useEffect } from 'react';
import './App.css';
import quizData from './assets/questions.json';
import lightIcon from './assets/light.svg';
import darkIcon from './assets/dark.svg';

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('home');

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      const isDark = JSON.parse(savedTheme);
      setIsDarkMode(isDark);
      document.body.classList.toggle('dark-mode', isDark);
    }

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

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.body.classList.toggle('dark-mode', newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  const startQuiz = () => {
    setCurrentScreen('quiz');
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsFinished(false);
  };

  const goToHome = () => {
    setCurrentScreen('home');
    setCurrentQuestionIndex(0);
    setSelectedOption('');
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className={`container ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* Dark mode toggle button */}
      <button
        className={isDarkMode ? 'dark-mode-toggle-dark' : 'dark-mode-toggle'}
        onClick={toggleDarkMode}
        aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        <img src={isDarkMode ? lightIcon : darkIcon} alt={isDarkMode ? 'Light Mode' : 'Dark Mode'} />
      </button>
      {currentScreen === 'quiz' && <button onClick={goToHome} className="back-to-home-button">
        Back to Home
      </button>}

      {currentScreen === 'home' && (
        <div className="home-screen">
          <h1>Welcome to the Quiz App</h1>
          <button onClick={startQuiz}>Start Quiz</button>
        </div>
      )}

      {currentScreen === 'quiz' && (
        <div className="quiz-screen">

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
      )}

      {currentScreen === 'end' && (
        <div className="end-screen">
          <h1>Quiz Finished!</h1>
          <p>Your score: {score}/{questions.length}</p>
          <button onClick={goToHome}>Back to Home</button>
        </div>
      )}
    </div>
  );
};

export default App;
