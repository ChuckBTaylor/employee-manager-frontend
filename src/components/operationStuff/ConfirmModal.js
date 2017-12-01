import { Modal } from 'semantic-ui-react';
import React from 'react';

const ConfirmModal = props => {

  const handleConfirm = plannerID => {
    return props.onConfirm()
  }

  const handleCancel = () => {
    return props.onCancel()
  }

  return (
  <Modal open={props.modalOpen} onClose={props.onModalClose} className="Modal">
    <Modal.Content>
      <p>
        {props.message}
        <br />
        {props.extraMessage === "" ? null : props.extraMessage}
      </p>
      <button onClick={handleConfirm}>{props.confirmText}</button>
      <button onClick={handleCancel}>{props.cancelText}</button>
    </Modal.Content>
  </Modal>
  )
}

ConfirmModal.defaultProps = {
  message: "Are you sure?",
  extraMessage: "",
  confirmText: "Confirm",
  cancelText: "Cancel",
  onConfirm: () => console.log("Confirmed"),
  onCancel: () => console.log("Cancelled")
}

export default ConfirmModal
