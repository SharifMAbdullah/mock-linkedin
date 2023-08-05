import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CustomModal from '../../Components/CustomModal/Modal';

import styles from './LoginForm.module.css';

const LoginForm = ({onLoginSuccess}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setModalTitle('Registration Failed');
      setModalMessage('Please enter your email and password.');
      setShowModal(true);
    } else {
      try {
        axios.post('http://localhost:5656/login', { email, password })
          .then((response) => {
            if (response.data.error) {
              console.error('Error logging in: ' + response.data.error);
            } else {
              console.log('Logged in!');
              sessionStorage.setItem("token", response.data.token);
              setPassword('');
              setEmail('');
              navigate('/home');
              onLoginSuccess();
            }
          })
      }
      catch (error) {
      setModalTitle('Login Failed');
      setModalMessage('Login failed. Please check your email and password.');
      setShowModal(true);
      console.error('Login error:', error.message);
      }
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Login Form</h2>
      <form onSubmit={handleLogin}>
        <div className={styles.formGroup}>
          <label htmlFor="loginEmail">Email</label>
          <input type="email" id="loginEmail" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="loginPassword">Password</label>
          <input type="password" id="loginPassword" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className={styles.loginButton}>Login</button>
      </form>
      <CustomModal
        show={showModal}
        onClose={() => setShowModal(false)}
        title={modalTitle}
        message={modalMessage}
      />
    </div>
  );
};

export default LoginForm;
