import React from 'react';
import { Modal } from 'semantic-ui-react';
import PieceForm from './PieceForm'


const PieceModal = props => {


  return(
    <Modal open={props.modalOpen} onClose={props.onModalClose} className="Modal">
      <Modal.Content>
        <PieceForm isModal={true} onModalClose={props.onModalClose} Piece={props.Piece} />
      </Modal.Content>
    </Modal>
  )
}

PieceModal.defaultProps = {

}


export default PieceModal;
