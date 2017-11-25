import React from 'react';
import { Modal } from 'semantic-ui-react';
import ProductForm from './ProductForm'


const ProductModal = props => {


  return(
    <Modal open={props.modalOpen} onClose={props.onModalClose} className="Modal">
      <Modal.Content>
        <ProductForm isModal={true} onModalClose={props.onModalClose} product={props.product} />
      </Modal.Content>
    </Modal>
  )
}

ProductModal.defaultProps = {

}


export default ProductModal;
