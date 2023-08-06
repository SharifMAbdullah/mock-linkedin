import React from 'react';
import CreatePostForm from '../../Components/CreatePostForm/CreatePostForm';
import PostList from '../../Components/PostList/PostList';
import Notification from '../NotificationPage/NotificationPage';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.container}>
      <h2 id='lala'>Welcome to Home Page!</h2>
      <Notification />
      <CreatePostForm />
      <PostList />
    </div>
  );
};

export default HomePage;
