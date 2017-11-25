import React from 'react';
import { Modal } from 'semantic-ui-react';
import ClientForm from './ClientForm'


const ClientModal = props => {


  return(
    <Modal open={props.modalOpen} onClose={props.onModalClose} className="Modal">
      <Modal.Content>
        <ClientForm isModal={true} onModalClose={props.onModalClose} client={props.client} />
      </Modal.Content>
    </Modal>
  )
}

ClientModal.defaultProps = {

}


export default ClientModal;
