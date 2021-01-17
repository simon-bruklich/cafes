import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const CustomModal = (props) => {
  // TODO: cleanup
  const showModal = props.show[0];
  const title = props.title;
  const body = props.body;
  const acceptFn = props.onAccept;
  const cancelFn = props.onCancel;
  const setShowModal = props.show[1];
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
      acceptFn();
      setAccepted(false);
    } else {
      cancelFn();
    }
  };

  return (
    <Modal
      show={showModal}
      backdrop="static"
      keyboard={false}
      centered
      onHide={() => setShowModal(false)}
      onExited={() => handleExited()}
    >
      <Modal.Header
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
