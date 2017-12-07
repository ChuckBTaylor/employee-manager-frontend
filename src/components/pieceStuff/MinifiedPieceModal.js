import React from 'react';
import { Modal } from 'semantic-ui-react';
import MinifiedPieceForm from './MinifiedPieceForm'

const MinifiedPieceModal = props => {
  return (
  <Modal open={props.modalOpen} onClose={props.onModalClose} className="Modal">
    <Modal.Content>
      <MinifiedPieceForm
        isModal={true}
        onModalClose={props.onModalClose}
        piece={props.piece}
        project={props.project}
        pieceServiceIDs={props.pieceServiceIDs}
      />
    </Modal.Content>
  </Modal>
  )
}

MinifiedPieceModal.defaultProps = {
  modalOpen: false,
  onModalClose: () => console.log("Modal closing"),
  pieceServiceIDs: []
}

export default MinifiedPieceModal
