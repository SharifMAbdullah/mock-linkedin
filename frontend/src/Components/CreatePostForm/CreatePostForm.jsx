import React, { useState } from 'react';
import axios from 'axios';

import styles from './CreatePostForm.module.css';

const CreatePostForm = () => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

const handleSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('content', content);
  if (image) {
    formData.append('image', image);
  }

  axios.post('http://localhost:5656/createPost', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Important for file upload
      },
    })
    .then((response) => {
      if (response.data.error) {
        console.error('Error creating post: ' + response.data.error);
      } else {
        sessionStorage.setItem("supersecretkey", JSON.stringify(response.data));
        console.log('Post created successfully!');
        // Add any success message or redirect to the homepage
      }
    })
    .catch((error) => {
      console.error('Error creating post:', error.message);
      // Handle error, show error message, etc.
    });
};



  return (
    <div className={styles.formContainer}>
      <h3>Create a New Post</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="content">Write something:</label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="image">Optional: Upload an image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePostForm;
