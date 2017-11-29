import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createPiece, patchPiece } from '../../actions/piece';
import { Dropdown } from 'semantic-ui-react';
import { findByID } from '../../helpers/generalHelpers';

class PieceForm extends Component{

  state = {
    name: this.props.piece.name || "",
    projectID: this.props.selectedProject.id || '',
    complete: this.props.piece.complete,
    serviceIDs: this.props.pieceServiceIDs
  }

  handleNameChange = ev => {
    this.setState({name: ev.target.value})
  }

  handleProjectChange = ev => {
    this.setState({projectID: +ev.target.value})
  }

  handleServiceChange = (ev, data) => {
    this.setState({serviceIDs: data.value})
  }

  handleSubmit = ev => {
    ev.preventDefault()
    if(this.props.isModal){
      this.props.patchPiece({...this.props.piece, ...this.state})
      this.props.onModalClose()
    } else {
      this.props.createPiece(this.state)
      this.props.history.push('/pieces')
    }
  }

  render(){
    console.log(this.state);
    const projectOptions = this.props.projects.map((project, idx) => (<option key={idx} value={project.id} >{project.name}</option>))

    const serviceOptions = this.props.services.map(service => ({key: service.id, value: service.id, text: service.name}))

    return(
      <div className="sixteen wide column">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="select-project">Select a project</label>
          <select required id='select-project' onChange={this.handleProjectChange} value={this.state.projectID}>
            <option value={''} disabled >--Choose a Project--</option>
            {projectOptions}
          </select>
          <br />
          <label htmlFor="">Piece Name: </label>
          <input type='text' onChange={this.handleNameChange} value={this.state.name}/>
          <br />
          <label htmlFor="">Select The Services for the Piece:</label>
          <br />
          <Dropdown
            value={this.state.serviceIDs}
            placeholder='Services'
            fluid multiple search selection
            options={serviceOptions}
            onChange={this.handleServiceChange}
          />
          <input type='submit' />
        </form>
      </div>
    )
  }
}

PieceForm.defaultProps = {
  isModal: false,
  selectedProject: {
    projectID: -1
  },
  piece: {
    name: "",
    id: -1,
    complete: false
  },
  pieceServiceIDs: []
}

const mapStateToProps = state => {
  return {
    services: state.services.list
  }
}


const mapDispatchToProps = dispatch => {
  return bindActionCreators({ createPiece, patchPiece }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PieceForm);
