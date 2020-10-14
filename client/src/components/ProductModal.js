import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Media } from 'reactstrap';
// import { ModalTitle } from 'react-bootstrap';

const ProductModal = (props) => {
  const {
    buttonLabel,
    className,
    modalTitle,
    modalText,
    modalImg
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="primary" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
        <ModalBody>
          <Media>
            <Media left href="#">
              {/* <Media object data-src="https://dictionary.cambridge.org/us/images/thumb/book_noun_001_01679.jpg?version=5.0.70" alt={modalImg} /> */}
              <img width="200" height="200" src={modalImg} />
            </Media>
            <Media body>
              <Media heading>
                Product Details
              </Media>
              <p>Title : {props.productData.Title}</p>
              <p>Product ID : {props.productData.Number}</p>
              <p>Price: ${(props.productData.Price).toFixed(2)}</p>
            </Media>
          </Media>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Add to Cart</Button>{' '}
          <Button color="secondary" onClick={toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ProductModal;