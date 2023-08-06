import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './NotificationPage.module.css';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    // Fetch notifications from the backend API
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:5656/notifications'); // Update the URL to match your backend route
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

  return (
    <div className={styles.notificationPage}>
      <button onClick={handleShowNotifications}>Notifications</button>
      {showNotifications && notifications.length > 0 && ( // Check if there are notifications to display
        <div className={styles.notificationList}>
          {notifications.map((notification) => (
            <div key={notification._id} className={styles.notificationBox}>
              {notification.message}
            </div>
          ))}
        </div>
      )}
      {showNotifications && notifications.length === 0 && ( // Display a message if there are no notifications
        <div className={styles.notificationList}>
          No notifications available.
        </div>
      )}
    </div>
  );
};

export default NotificationPage;
