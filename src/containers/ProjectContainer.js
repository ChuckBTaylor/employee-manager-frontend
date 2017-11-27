import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProjectList from '../components/projectStuff/ProjectList';
import ProjectShow from '../components/projectStuff/ProjectShow';
import ProjectModal from '../components/projectStuff/ProjectModal';
import ProjectForm from '../components/projectStuff/ProjectForm';
import { fetchPieces, selectPiece } from '../actions/piece'
import { fetchProjects, selectProject, destroyProject } from '../actions/project';
import { fetchClients } from '../actions/client';
import { Route } from 'react-router';

class ProjectContainer extends Component{

  state = {
    modalOpen: false,
    filteredClient: -1
  }

  onSelectPiece = piece => {
    this.props.selectPiece(piece)
  }

  handleFilterChange = ev => {
    this.setState({filteredClient: +ev.target.value})
  }

  handleNewProjectClick = () => {
    this.props.history.push(`${this.props.match.path}/new`)
  }

  onEditClick = () => {
    this.setState({modalOpen: true})
  }

  onDeleteClick = () => {
    this.props.destroyProject(this.props.selectedProject)
  }

  onModalClose = () => {
    this.setState({modalOpen: false})
  }

  onSelectProject = project => {
    this.props.selectProject(project)
  }

  hasSelectedProject = () => {
    return !!(Object.keys(this.props.selectedProject).length > 0)
  }

  render(){

    console.log(this.props);
    const clientOptions = this.props.clients.map((client, idx) => (<option value={client.id} key={idx*10}>{client.name}</option>))

    const filteredProjects = (this.state.filteredClient === -1) ? (this.props.projects) : (this.props.projects.filter(project => project.clientID === this.state.filteredClient))

    return(
      <div>
        <Route exact path='/projects' render={() => (<button onClick={this.handleNewProjectClick} >New Project</button>) } /><br />
        <div className='ui grid'>
          <Route path='/projects/new' render={props => (<ProjectForm {...props} clients={this.props.clients}  selectedClient={this.props.selectedClient }/>) } />

          <ProjectList onSelectProject={this.onSelectProject} projects={filteredProjects} />

          {this.hasSelectedProject() > 0 ? (<Route exact path='/projects' render={() => <ProjectShow project={this.props.selectedProject} pieces={this.props.projectPieces} client={this.props.selectedClient} onEditClick={this.onEditClick} onDeleteClick={this.onDeleteClick} onSelectPiece={this.onSelectPiece} />} />) : null}
        </div>
        <br />
        <label htmlFor="client-project-filter">Filter Projects By Client: </label>
        <select id='client-project-filter' onChange={this.handleFilterChange} value={this.state.filteredClient} >
          <option value={-1} >All</option>
          {clientOptions}
        </select>
        <br />
        <ProjectModal modalOpen={this.state.modalOpen} onModalClose={this.onModalClose} project={this.props.selectedProject} clients={this.props.clients} />
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
    projects: state.projects.list,
    clients: state.clients.list,
    projectPieces: state.pieces.projectPieces,
    selectedProject: state.projects.selectedProject,
    selectedClient: state.clients.selectedClient,
    didFetchClients: state.clients.didFetch,
    didFetchProjects: state.projects.didFetch
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchClients, fetchProjects, selectProject, destroyProject, fetchPieces, selectPiece }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectContainer);
