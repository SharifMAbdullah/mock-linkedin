import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './Pages/LoginForm/LoginForm';
import RegistrationPage from './Pages/RegistrationForm/RegistrationForm';
import MainPage from './Pages/MainPage/MainPage';
import HomePage from './Pages/HomePage/HomePage';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/home" element={loggedIn ? <HomePage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;