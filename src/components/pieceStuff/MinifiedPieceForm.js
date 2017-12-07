import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createPiece, patchPiece, destroyPiece } from '../../actions/piece';
import { Dropdown } from 'semantic-ui-react';

class PieceForm extends Component{

  state = {
    name: this.props.isModal ? this.props.piece.name : "",
    serviceIDs: this.props.isModal ? this.props.pieceServiceIDs : [],
    deleteClicked: false
  }

  handlePieceChange = ev => {
    this.setState({name: ev.target.value})
  }

  handleServiceChange = (ev, data) => {
    this.setState({serviceIDs: data.value})
  }

  handleAddPieceClick = () => {
    if(this.state.name !== ""){
      if(this.props.isModal){
        this.props.patchPiece({...this.props.piece, ...this.state})
        this.props.onModalClose()
      } else {
        this.props.createPiece({...this.state, projectID: this.props.project.id})
        this.setState({name: "", serviceIDs: []})
      }
    }
  }

  handleDelete = () => {
    if(this.state.deleteClicked){
      this.props.destroyPiece(this.props.piece)
      this.props.onModalClose()
    } else {
      this.setState({deleteClicked: true})
      setTimeout(() => this.setState({deleteClicked: false}), 750)
    }
  }

  isEnter = ev => {
    if(ev.which === 13){
      this.handleAddPieceClick()
    }
  }



  render(){
    // const projectOptions = this.props.projects.map((project, idx) => (<option key={idx} value={project.id} >{project.name}</option>))
    console.log(this.props);
    const serviceOptions = this.props.services.map(service => ({key: service.id, value: service.id, text: service.name}))
    return(
      <div>
        <Dropdown
          value={this.state.serviceIDs}
          placeholder='Services'
          fluid multiple search selection
          options={serviceOptions}
          onChange={this.handleServiceChange}
        />
        <input type='text' size='15' placeholder='New Piece' value={this.state.name} onChange={this.handlePieceChange} onKeyDown={this.isEnter}/>{this.props.isModal ? 'Save' : 'Add'}
        <i onClick={this.handleAddPieceClick} className={this.props.isModal ? 'save icon' : 'plus square outline icon'} />
        <br /><br /><br />
         {!this.props.isModal ? null :
           <div className='delete piece'>
            <p onClick={this.handleDelete}>
              Delete<i className='trash icon' />
            </p>
           </div>
         }
      </div>
    )
    // return(
    //   <div className="sixteen wide column">
    //     <form onSubmit={this.handleSubmit}>
    //       <label htmlFor="select-project">Select a project</label>
    //       <select required id='select-project' onChange={this.handleProjectChange} value={this.state.projectID}>
    //         <option value={''} disabled >--Choose a Project--</option>
    //         {projectOptions}
    //       </select>
    //       <br />
    //       <label htmlFor="">Piece Name: </label>
    //       <input type='text' onChange={this.handleNameChange} value={this.state.name}/>
    //       <br />
    //       <label htmlFor="">Select The Services for the Piece:</label>
    //       <br />
    //       <Dropdown
    //         value={this.state.serviceIDs}
    //         placeholder='Services'
    //         fluid multiple search selection
    //         options={serviceOptions}
    //         onChange={this.handleServiceChange}
    //       />
    //       <input type='submit' />
    //     </form>
    //   </div>
    // )
  }
}

PieceForm.defaultProps = {
  isModal: false,
  project: {
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
  return bindActionCreators({ createPiece, patchPiece, destroyPiece }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PieceForm);
