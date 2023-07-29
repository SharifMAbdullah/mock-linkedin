import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import styles from './Modal.module.css'; // Import the modal styles (optional)

const CustomModal = ({ show, onClose, title, message }) => {
  return (
    <Modal
      show={show}
      onHide={onClose}
      centered // This will center the modal vertically and horizontally
      className={styles.customModal} // Add your custom modal class (optional)
    >
      <Modal.Title>{title}</Modal.Title><br></br>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
