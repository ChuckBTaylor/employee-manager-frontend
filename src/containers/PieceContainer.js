import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PieceList from '../components/pieceStuff/PieceList';
import PieceShow from '../components/pieceStuff/PieceShow';
import PieceModal from '../components/pieceStuff/PieceModal';
import PieceForm from '../components/pieceStuff/PieceForm';
import { fetchPieces, selectPiece, destroyPiece } from '../actions/piece';
import { fetchProjects } from '../actions/project';
import { fetchClients } from '../actions/client';
import { Route } from 'react-router';

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
    const projectOptions = this.props.projects.map((project, idx) => (<option value={project.id} key={idx*10}>{project.name}</option>))

    const filteredPieces = (this.state.filteredProject === -1) ? (this.props.pieces) : (this.props.pieces.filter(piece => piece.projectID === this.state.filteredProject))

    return(
      <div>
        <Route exact path='/pieces' render={() => (<button onClick={this.handleNewPieceClick} >New Piece</button>) } /><br />
        <div className='ui grid'>
          <Route path='/pieces/new' render={props => (<PieceForm {...props} projects={this.props.projects}  selectedProject={this.props.selectedProject} />) } />

          <PieceList onSelectPiece={this.onSelectPiece} pieces={filteredPieces} />

          {this.hasSelectedPiece() > 0 ? (<Route exact path='/pieces' render={() => <PieceShow piece={this.props.selectedPiece} onEditClick={this.onEditClick} project={this.props.selectedProject} onDeleteClick={this.onDeleteClick} />} />) : null}
        </div>
        <br />
        <label htmlFor="project-piece-filter">Filter Pieces By Project: </label>
        <select id='project-piece-filter' value={this.state.filteredProject} onChange={this.handleFilterChange}>
          <option value={-1}>All</option>
          {projectOptions}
        </select>
        <br />

        <PieceModal modalOpen={this.state.modalOpen} onModalClose={this.onModalClose} piece={this.props.selectedPiece} projects={this.props.projects} selectedProject={this.props.selectedProject} />
      </div>
    )
  }

  componentDidMount = () => {
    if(this.props.didFetchClients){
      if(this.props.didFetchProjects){
        this.props.didFetchPieces ? null : this.props.fetchPieces(this.props.projects)
      } else {
        this.props.fetchProjects()
          .then(() => this.props.fetchPieces(this.props.projects))
      }
    } else {
      this.props.fetchClients()
        .then(() => this.props.fetchProjects(this.props.clients))
          .then(() => this.props.fetchPieces(this.props.projects))
    }
  }
}

const mapStateToProps = state => {
  return {
    pieces: state.pieces.list,
    projects: state.projects.list,
    clients: state.clients.list,
    selectedPiece: state.pieces.selectedPiece,
    selectedProject: state.projects.selectedProject,
    didFetchProjects: state.projects.didFetch,
    didFetchPieces: state.pieces.didFetch,
    didFetchClients: state.clients.didFetch
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchClients, fetchProjects, fetchPieces, selectPiece, destroyPiece }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PieceContainer);
