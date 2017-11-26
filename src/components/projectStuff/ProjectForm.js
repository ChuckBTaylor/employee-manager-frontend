import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createProject, patchProject } from '../../actions/project';

class ProjectForm extends Component{

  state = {
    name: this.props.isModal ? this.props.project.name : "",
    clientCUID: this.props.isModal ? this.props.project.clientCUID : ""
  }

  handleNameChange = ev => {
    this.setState({name: ev.target.value})

  }

  handleClientChange = ev => {
    this.setState({clientCUID: ev.target.value})
  }

  handleSubmit = ev => {
    ev.preventDefault()
    if(this.props.isModal){
      this.props.patchProject({...this.state, cuid: this.props.project.cuid, id: this.props.project.id})
      this.props.onModalClose()
    } else {
      this.props.createProject(this.state)
      this.props.history.push('/projects')
    }
  }

  render(){
    const clientOptions = this.props.clients.map((client, idx) => (<option key={idx} value={client.cuid} >{client.name}</option>))
    return(
      <div className="sixteen wide column">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="">Name: </label>
          <input type='text' onChange={this.handleNameChange} value={this.state.name}/>
          <br />
          <label htmlFor="select-client">Select a client</label>
          <select required id='select-client' onChange={this.handleClientChange}>
            <option value='' disabled selected >--Choose a Client--</option>
            {clientOptions}
          </select>
          <input type='submit' />
        </form>
      </div>
    )
  }
}

ProjectForm.defaultProps = {
  isModal: false,
  clientCUID: "",
  project: {
    name: ""
  },
  isFromClient: false
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ createProject, patchProject }, dispatch)
}

export default connect(null, mapDispatchToProps)(ProjectForm);
