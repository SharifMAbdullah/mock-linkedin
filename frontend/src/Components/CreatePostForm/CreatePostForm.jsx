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

const handleSubmit = async (e) => {
  e.preventDefault();

  const postObject = {
    content: content,
    image: image
  }

  console.log(postObject);

  try {
    await axios.post('http://localhost:5656/createPost', postObject, {
      headers: {
        Authorization: sessionStorage.getItem("token"),
        'Content-Type': 'multipart/form-data',
      }
    });
    
    console.log('Post created successfully!');
  } catch (error) {
    console.error('Error creating post:', error.message);
  }
};

  return (
    <div className={styles.formContainer}>
      <h3>Create a New Post</h3>
      <form id="postForm" onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="content">Write something:</label>
          <textarea
            id="content"
            name="content"
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
            name="image"
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
