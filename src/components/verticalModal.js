import React from 'react';
import { Modal, Button } from 'react-bootstrap';

// centered horizontal modal component which is used by the price modal

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter text-center">
          <img className="ml-5"
          style={{width: "6em", height: "6em", float: "left"}} 
          src={require('../Assets/'+props.item.image)} alt="popupImage" />
          <div ><p className="mr-5 text-center">{props.item.name}<br/>
          <sub>{props.item.region}</sub> </p></div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <h4>Pricing: </h4>
        <h5>$ {(props.item.price)} - 1 Day</h5>
        <h5>$ {(props.item.price) * 5} - 5 Days</h5>
        <h5>$ {(props.item.price) * 30} - 30 Days</h5>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;