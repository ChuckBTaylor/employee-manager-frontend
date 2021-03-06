import React from 'react';
import { Modal } from 'semantic-ui-react';
import EmployeeForm from './EmployeeForm'


const EmployeeModal = props => {


  return(
    <Modal open={props.modalOpen} onClose={props.onModalClose} className="Modal">
      <Modal.Content>
        <EmployeeForm isModal={true} onModalClose={props.onModalClose} employee={props.employee} />
      </Modal.Content>
    </Modal>
  )
}

EmployeeModal.defaultProps = {

}


export default EmployeeModal;
