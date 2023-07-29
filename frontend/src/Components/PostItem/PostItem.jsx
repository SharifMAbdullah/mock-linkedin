import React from 'react';
import PropTypes from 'prop-types';

import styles from './PostItem.module.css';

const PostItem = ({ post }) => {
  return (
    <div className={styles.postItem}>
      <h4>{post.username}</h4>
      <p>{post.content}</p>
      {/* Display optional image here if available in the post object */}
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostItem;
