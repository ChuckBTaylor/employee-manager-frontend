import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PieceList from '../components/pieceStuff/PieceList';
import PieceShow from '../components/pieceStuff/PieceShow';
import PieceModal from '../components/pieceStuff/PieceModal';
import PieceForm from '../components/pieceStuff/PieceForm';
import { selectPiece, destroyPiece } from '../actions/piece';
import { Route } from 'react-router';
import { findByID } from '../helpers/generalHelpers';

class PieceContainer extends Component{

  state = {
    modalOpen: false,
    filteredProject: -1
  }

  handleFilterChange = ev => {
    this.setState({filteredProject: +ev.target.value})
  }

  handleNewPieceClick = () => {
    this.props.history.push(`${this.props.match.path}/new`)
  }

  onEditClick = () => {
    this.setState({modalOpen: true})
  }

  onDeleteClick = () => {
    this.props.destroyPiece(this.props.selectedPiece)
  }

  onModalClose = () => {
    this.setState({modalOpen: false})
  }

  onSelectPiece = piece => {
    this.props.selectPiece(piece)
  }

  hasSelectedPiece = () => {
    return !!(Object.keys(this.props.selectedPiece).length > 0)
  }

  render(){
    const pieceServices = []
    if(this.hasSelectedPiece()){
      this.props.procedures.filter(procedure => procedure.pieceID === this.props.selectedPiece.id).forEach(procedure => pieceServices.push(findByID(this.props.services, procedure.serviceID)))
    }

    const pieceServiceIDs = pieceServices.map(service => service.id)

    const projectOptions = this.props.projects.map((project, idx) => (<option value={project.id} key={idx*10}>{project.name}</option>))

    const filteredPieces = (this.state.filteredProject === -1) ? (this.props.pieces) : (this.props.pieces.filter(piece => piece.projectID === this.state.filteredProject))

    return(
      <div>
        <div className='ui grid'>
          <Route path='/pieces/new' render={props => (<PieceForm {...props} projects={this.props.projects}  selectedProject={this.props.selectedProject} />) } />

          <PieceList onSelectPiece={this.onSelectPiece} pieces={filteredPieces} />

          {this.hasSelectedPiece() ? (<Route path='/pieces' render={() =>
            <PieceShow
              piece={this.props.selectedPiece}
              onEditClick={this.onEditClick}
              project={this.props.selectedProject}
              onDeleteClick={this.onDeleteClick}
              services={pieceServices}

            />
          } />) : null}
        </div>
        <br />
        <label htmlFor="project-piece-filter">Filter Pieces By Project: </label>
        <select id='project-piece-filter' value={this.state.filteredProject} onChange={this.handleFilterChange}>
          <option value={-1}>All</option>
          {projectOptions}
        </select>
        <br />
        <Route exact path='/pieces' render={() => (<button onClick={this.handleNewPieceClick} >New Piece</button>) } />
        <br />
        <PieceModal
          modalOpen={this.state.modalOpen}
          onModalClose={this.onModalClose}
          piece={this.props.selectedPiece}
          projects={this.props.projects}
          selectedProject={this.props.selectedProject}
          serviceIDs={pieceServiceIDs}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    pieces: state.pieces.list,
    projects: state.projects.list,
    selectedPiece: state.pieces.selectedPiece,
    selectedProject: state.projects.selectedProject,
    services: state.services.list,
    procedures: state.procedures.list
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ selectPiece, destroyPiece }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PieceContainer);
