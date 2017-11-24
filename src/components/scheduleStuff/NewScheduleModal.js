import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import NewScheduleForm from './NewScheduleForm'


class NewScheduleModal extends Component{


  render(){
    return(
      <Modal open={this.props.modalOpen} onClose={this.props.onModalClose} >
        <Modal.Content>
          <NewScheduleForm cuid={this.props.cuid} id={this.props.id} start={this.props.start} end={this.props.end} onAddSchedule={this.props.onModalClose} isModal={true} selectedEmployee={this.props.selectedEmployee} onSelectEmployee={this.props.onSelectEmployee} isEdit={this.props.isEdit} description={this.props.description} />
        </Modal.Content>
      </Modal>
    )
  }
}

NewScheduleModal.defaultProps = {
  start: "",
  end: ""
}


export default NewScheduleModal;
