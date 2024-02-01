import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function ConfirmModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.heading}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4> {props.title}</h4>
        <p>{props.text}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn-danger" onClick={props.onHide}>
          Close
        </Button>
        <Button onClick={props.onConfirm}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
}
