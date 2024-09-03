import { useState, useEffect } from 'react';
import './App.css';
import quizData from './assets/questions.json';
import lightIcon from './assets/light.svg';
import darkIcon from './assets/dark.svg';

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      const isDark = JSON.parse(savedTheme);
      setIsDarkMode(isDark);
      document.body.classList.toggle('dark-mode', isDark);
    }

    const shuffledQuestions = quizData.map((question) => {
      return {
        ...question,
        options: shuffleArray([...question.options]),
      };
    });
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

  return (
    <div className='container'>
      {
        isDarkMode ? 
          (<button className='dark-mode-toggle-dark' onClick={toggleDarkMode}>
            <img src={lightIcon} alt="Light Mode" />
          </button>):
          (<button className='dark-mode-toggle' onClick={toggleDarkMode}>
            <img src={darkIcon} alt="Dark Mode" />
          </button>)
      }
      
      {isFinished ? (
        <div>
          <h1>Quiz Finished!</h1>
          <p>Your score: {score}/{questions.length}</p>
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
                    />
                    {option}
                  </label>
                </div>
              ))}
            </form>
            <button onClick={handleSubmit} disabled={!selectedOption}>
              Submit
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default App;
