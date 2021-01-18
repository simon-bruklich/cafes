import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

/**
 * Abstracted modal component used for all modals on site.
 * @param {*} props If modal is showing, the title of modal, the body of modal, function if accepted, function if cancelled.
 */
const CustomModal = ({ show, title, body, onAccept, onCancel }) => {
  const showModal = show[0];
  const setShowModal = show[1];
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    setAccepted(true);
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleExited = () => {
    if (accepted) {
      onAccept();
      setAccepted(false);
    } else {
      onCancel();
    }
  };

  return (
    <Modal
      show={!!showModal}
      backdrop="static"
      keyboard={false}
      centered
      onHide={() => setShowModal(false)}
      onExited={() => handleExited()}
    >
      <Modal.Header
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        closeButton
      >
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{<p>{body}</p>}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => handleAccept()}>
          I Understand
        </Button>
        <Button variant="secondary" onClick={() => handleCancel()}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
