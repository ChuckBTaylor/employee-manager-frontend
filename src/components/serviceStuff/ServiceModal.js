import React from 'react';
import { Modal } from 'semantic-ui-react';
import ServiceForm from './ServiceForm'


const ServiceModal = props => {


  return(
    <Modal open={props.modalOpen} onClose={props.onModalClose} className="Modal">
      <Modal.Content>
        <ServiceForm isModal={true} onModalClose={props.onModalClose} service={props.service} />
      </Modal.Content>
    </Modal>
  )
}

ServiceModal.defaultProps = {

}


export default ServiceModal;
