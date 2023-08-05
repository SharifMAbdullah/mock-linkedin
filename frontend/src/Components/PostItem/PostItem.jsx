import React from 'react';
import PropTypes from 'prop-types';

import styles from './PostItem.module.css';

const PostItem = ({ post }) => {
  return (
    <div className={styles.postItem}>
      <h4>{post.username} wrote:</h4>
      <p>{post.content}</p>
      {post.image && (
        <img src={`http://localhost:5656/${post.image}`} alt={post.username + "'s image"} />
      )}
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostItem;
