import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createProject, patchProject } from '../../actions/project';

class ProjectForm extends Component{

  state = {
    name: this.props.project.name || "",
    clientID: this.props.project.clientID || this.props.selectedClient.id || '',
    complete: this.props.project.complete
  }

  handleNameChange = ev => {
    this.setState({name: ev.target.value})

  }

  handleClientChange = ev => {
    this.setState({clientID: +ev.target.value})
  }

  handleSubmit = ev => {
    ev.preventDefault()
    if(this.props.isModal){
      this.props.patchProject({...this.props.project, ...this.state})
      this.props.onModalClose()
    } else {
      this.props.createProject(this.state)
      this.props.history.push('/projects')
    }
  }

  render(){
    const clientOptions = this.props.clients.map((client, idx) => (<option key={idx} value={client.id} >{client.name}</option>))
    return(
      <div className="sixteen wide column">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="select-client">Select a client</label>
          <select required id='select-client' value={this.state.clientID} onChange={this.handleClientChange} >
            <option value={''} disabled >--Choose a Client--</option>
            {clientOptions}
          </select>
          <br />
          <label htmlFor="">Project Name: </label>
          <input type='text' onChange={this.handleNameChange} value={this.state.name}/>
          <br />
          <input type='submit' />
        </form>
      </div>
    )
  }
}

ProjectForm.defaultProps = {
  isModal: false,
  selectedClient: {
    clientID: -1
  },
  project: {
    name: "",
    id: -1,
    complete: false
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ createProject, patchProject }, dispatch)
}

export default connect(null, mapDispatchToProps)(ProjectForm);
