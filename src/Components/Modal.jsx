import React from "react";
import { Modal, Button } from "react-bootstrap";

const CustomModal = (props) => {
  const showState = props.show;
  const title = props.title;
  const body = props.body;
  const acceptFn = props.onAccept;
  const cancelFn = props.onCancel;

  return (
    <Modal
      show={showState}
      onHide={cancelFn}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{<p>{body}</p>}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={acceptFn}>
          I Understand
        </Button>
        <Button variant="secondary" onClick={cancelFn}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
