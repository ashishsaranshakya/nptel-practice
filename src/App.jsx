import { useState, useEffect } from 'react';
import './App.css';
import quizData from './assets/questions.json';

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
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

  return (
    <div className='container'>
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
