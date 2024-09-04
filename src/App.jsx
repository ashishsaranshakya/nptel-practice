import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './HomeScreen';
import QuizScreen from './QuizScreen';
import ResultScreen from './ResultScreen';
import lightIcon from './assets/light.svg';
import darkIcon from './assets/dark.svg';
import './App.css';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      const isDark = JSON.parse(savedTheme);
      setIsDarkMode(isDark);
      document.body.classList.toggle('dark-mode', isDark);
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.body.classList.toggle('dark-mode', newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  return (
    <Router>
      <div className={`container ${isDarkMode ? 'dark-mode' : ''}`}>
        {/* Dark mode toggle button */}
        <button
          className={isDarkMode ? 'dark-mode-toggle-dark' : 'dark-mode-toggle'}
          onClick={toggleDarkMode}
          aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          <img src={isDarkMode ? lightIcon : darkIcon} alt={isDarkMode ? 'Light Mode' : 'Dark Mode'} />
        </button>
        
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/quiz" element={<QuizScreen />} />
          <Route path="/result" element={<ResultScreen />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
