import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import EmployeeForm from './EmployeeForm'


class EmployeeModal extends Component{


  render(){
    return(
      <Modal open={this.props.modalOpen} onClose={this.props.onModalClose} className="Modal">
        <Modal.Content>
          <EmployeeForm isModal={true} onModalClose={this.props.onModalClose} employee={this.props.employee} />
        </Modal.Content>
      </Modal>
    )
  }
}

EmployeeModal.defaultProps = {

}


export default EmployeeModal;
