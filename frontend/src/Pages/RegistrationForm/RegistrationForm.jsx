import React, { useState } from 'react';
import axios from 'axios';
import CustomModal from '../../Components/CustomModal/Modal';

import styles from './RegistrationForm.module.css';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setModalTitle('Registration Failed');
      setModalMessage('Please fill in all fields.');
      setShowModal(true);
    } else {
      try {
        await axios.post('http://localhost:3636/registration', { username, email, password });
        setModalTitle('Registration Successful');
        setModalMessage('You can now login.');
        setShowModal(true);
        setUsername('');
        setEmail('');
        setPassword('');
      } catch (error) {
        setModalTitle('Registration Failed');
        setModalMessage('An error occurred during registration.');
        setShowModal(true);
        console.error(error);
      }
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className={styles.registerButton}>Register</button>
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

export default RegistrationForm;
