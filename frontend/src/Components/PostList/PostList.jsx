import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostItem from '../PostItem/PostItem';

import styles from './PostList.module.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from the server (adjust the API endpoint accordingly)
    axios.get('http://localhost:5656/posts') // need to correct the api
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  return (
    <div className={styles.postList}>
      <h3>Recent Posts</h3>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
