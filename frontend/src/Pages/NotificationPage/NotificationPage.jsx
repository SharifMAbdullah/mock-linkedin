import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './NotificationPage.module.css';
import { VIEW_ALL_NOTIFICATION_URL } from '../../api-config';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [responseData, setResponseData] = useState(null); // Add state variable for response data

  useEffect(() => {
    // Fetch notifications from the backend API
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(VIEW_ALL_NOTIFICATION_URL);
        setNotifications(response.data);
        console.log('Notifications: ' + JSON.stringify(response.data));
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleShowNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleNotificationClick = async (postId) => {
    try {
      const response = await axios.get(`http://localhost:5656/viewPost/single?postId=${postId}`);
      setResponseData(response.data); // Save the response data in state
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  return (
    <div className={styles.notificationPage}>
      <button onClick={handleShowNotifications}>Notifications</button>
      {showNotifications && notifications.length > 0 && (
        <div className={styles.notificationList}>
          {notifications.map((notification) => (
            <div
              key={notification._id}
              className={styles.notificationBox}
              onClick={() => handleNotificationClick(notification.postId)}
            >
              {notification.message}
            </div>
          ))}
        </div>
      )}
      {showNotifications && notifications.length === 0 && (
        <div className={styles.notificationList}>No notifications available.</div>
      )}

      {/* Display the response data in a box */}
      {responseData && (
        <div className={styles.responseDataBox}>
            <h3>Full Post</h3>
            <h4>{responseData.username}</h4>
            <p>{responseData.content}</p>
        </div>
      )}
    </div>
  );
};

export default NotificationPage;
