import React from 'react';
import { Modal } from 'semantic-ui-react';
import ProjectForm from './ProjectForm'


const ProjectModal = props => {

  return(
    <Modal open={props.modalOpen} onClose={props.onModalClose} className="Modal">
      <Modal.Content>
        <ProjectForm isModal={true} onModalClose={props.onModalClose} project={props.project} clients={props.clients} clientID={props.clientID} selectedClient={props.selectedClient} />
      </Modal.Content>
    </Modal>
  )
}

ProjectModal.defaultProps = {

}


export default ProjectModal;
