import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostItem from '../PostItem/PostItem';
import { VIEW_ALL_POST_URL } from "../../api-config";
import styles from './PostList.module.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from the server (adjust the API endpoint accordingly)
    axios.get(VIEW_ALL_POST_URL)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  return (
    <div className={styles.postList}>
      <h4>Recent Posts</h4>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
