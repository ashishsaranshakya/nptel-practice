import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import HomeScreen from './HomeScreen';
import QuizScreen from './QuizScreen';
import OverallQuizScreen from './OverallQuizScreen';
import ResultScreen from './ResultScreen';
import lightIcon from './assets/light.svg';
import darkIcon from './assets/dark.svg';
import './App.css';
import AdminConsole from './AdminConsole';
import axios from 'axios';

const AdminButton = () => {
  const navigate = useNavigate();
  return (
    <button
      className="admin-console-button"
      onClick={() => navigate('/admin-console')}
      aria-label="Go to Admin Console"
    >
      Admin Console
    </button>
  );
};

const App = () => {
  const [isAnalyticEnabled, setIsAnalyticEnabled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [count, setCount] = useState(null);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      const isDark = JSON.parse(savedTheme);
      setIsDarkMode(isDark);
      document.body.classList.toggle('dark-mode', isDark);
    }
  }, []);

  useEffect(() => {
    setIsAnalyticEnabled(!!import.meta.env.VITE_ANALYTIC_SERVER_URL);
  }, []);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await axios.post(`${import.meta.env.VITE_ANALYTIC_SERVER_URL}/take-quiz`);
        if (res.data.message === 'Quiz taken') {
          setCount(res.data.count);
        }
      } catch (err) {
        console.error('Error fetching count:', err);
      }
    };

    if (isAnalyticEnabled) {
      fetchCount();
    }
  }, [isAnalyticEnabled])

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.body.classList.toggle('dark-mode', newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  return (
    <div className={`container ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="button-container">
        {(isAnalyticEnabled && currentPath !== '/admin-console') && <AdminButton />}
        <button
          className={isDarkMode ? 'dark-mode-toggle-dark' : 'dark-mode-toggle'}
          onClick={toggleDarkMode}
          aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          <img src={isDarkMode ? lightIcon : darkIcon} alt={isDarkMode ? 'Light Mode' : 'Dark Mode'} />
        </button>
      </div>

      <Routes>
        <Route path="/" element={<HomeScreen count={count} />} />
        <Route path="/quiz/:chapterId" element={<QuizScreen />} />
        <Route path="/overall-quiz" element={<OverallQuizScreen />} />
        <Route path="/result" element={<ResultScreen />} />
        {isAnalyticEnabled && <Route path="/admin-console" element={<AdminConsole setCount={setCount} />} />}
      </Routes>
    </div>
  );
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
