import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createPiece, patchPiece } from '../../actions/piece';

class PieceForm extends Component{

  state = {
    name: this.props.piece.name || "",
    projectID: this.props.selectedProject.id || -1
  }

  handleNameChange = ev => {
    this.setState({name: ev.target.value})

  }

  handleProjectChange = ev => {
    this.setState({projectID: +ev.target.value})
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
    const projectOptions = this.props.projects.map((project, idx) => (<option key={idx} value={project.id} >{project.name}</option>))
    return(
      <div className="sixteen wide column">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="">Name: </label>
          <input type='text' onChange={this.handleNameChange} value={this.state.name}/>
          <br />
          <label htmlFor="select-project">Select a project</label>
          <select required id='select-project' onChange={this.handleProjectChange} value={this.state.projectID}>
            <option value={-1} disabled >--Choose a Project--</option>
            {projectOptions}
          </select>
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
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ createPiece, patchPiece }, dispatch)
}

export default connect(null, mapDispatchToProps)(PieceForm);
