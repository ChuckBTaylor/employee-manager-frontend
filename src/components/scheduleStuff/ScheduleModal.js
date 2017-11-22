import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import NewScheduleForm from './NewScheduleForm'


class ScheduleModal extends Component{


  render(){
    return(
      <Modal open={this.props.modalOpen} onClose={this.props.onModalClose} >
        <Modal.Content>
          <NewScheduleForm start={this.props.start} end={this.props.end} onAddSchedule={this.props.onModalClose} isModal={true} />
        </Modal.Content>
      </Modal>
    )
  }
}

ScheduleModal.defaultProps = {
  start: "",
  end: ""
}


export default ScheduleModal;
