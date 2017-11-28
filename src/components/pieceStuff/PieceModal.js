import React from 'react';
import { Modal } from 'semantic-ui-react';
import PieceForm from './PieceForm'


const PieceModal = props => {


  return(
    <Modal open={props.modalOpen} onClose={props.onModalClose} className="Modal">
      <Modal.Content>
        <PieceForm isModal={true} onModalClose={props.onModalClose} piece={props.piece} projects={props.projects} selectedProject={props.selectedProject} />
      </Modal.Content>
    </Modal>
  )
}

PieceModal.defaultProps = {

}


export default PieceModal;
