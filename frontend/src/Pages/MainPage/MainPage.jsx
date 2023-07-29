import React, { useState } from 'react';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import LoginForm from '../LoginForm/LoginForm';

import styles from './MainPage.module.css';

const MainPage = () => {
  const [activeTab, setActiveTab] = useState('registration');

  return (
    <div className={styles.container}>
      <div className={styles.tabContainer}>
        <div
          className={`${styles.tabItem} ${activeTab === 'registration' && styles.activeTab}`}
          onClick={() => setActiveTab('registration')}
        >
          Registration
        </div>
        <div
          className={`${styles.tabItem} ${activeTab === 'login' && styles.activeTab}`}
          onClick={() => setActiveTab('login')}
        >
          Login
        </div>
      </div>
      <div className={styles.formContainer}>
        {activeTab === 'registration' ? (
          <RegistrationForm />
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
};

export default MainPage;
