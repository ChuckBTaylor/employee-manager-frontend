import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProjectList from '../components/projectStuff/ProjectList';
import ProjectShow from '../components/projectStuff/ProjectShow';
import ProjectModal from '../components/projectStuff/ProjectModal';
import ProjectForm from '../components/projectStuff/ProjectForm';
import { fetchProjects, selectProject, destroyProject } from '../actions/project';
import { fetchClients } from '../actions/client';
import { Route } from 'react-router';

class ProjectContainer extends Component{

  state = {
    modalOpen: false,
    filteredClient: ""
  }

  handleFilterChange = ev => {
    this.setState({filteredClient: ev.target.value})
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
    const clientOptions = this.props.clients.map((client, idx) => (<option value={client.cuid} key={idx*10}>{client.name}</option>))

    const filteredProjects = (this.state.filteredClient === "") ? (this.props.projects) : (this.props.projects.filter(project => project.clientCUID === this.state.filteredClient))

    return(
      <div>
        <Route exact path='/projects' render={() => (<button onClick={this.handleNewProjectClick} >New Project</button>) } /><br />
        <div className='ui grid'>
          <Route path='/projects/new' render={props => (<ProjectForm {...props} clients={this.props.clients}  selectedClient={this.props.selectedClient }/>) } />

          <ProjectList onSelectProject={this.onSelectProject} projects={filteredProjects} />

          {this.hasSelectedProject() > 0 ? (<Route exact path='/projects' render={() => <ProjectShow project={this.props.selectedProject} onEditClick={this.onEditClick} onDeleteClick={this.onDeleteClick} />} />) : null}
        </div>
        <label htmlFor="client-project-filter">Filter Projects By Client: </label>
        <select id='client-project-filter' onChange={this.handleFilterChange}>
          <option value="" selected>All</option>
          {clientOptions}
        </select>

        <ProjectModal modalOpen={this.state.modalOpen} onModalClose={this.onModalClose} project={this.props.selectedProject} />
      </div>
    )
  }

  componentDidMount = () => {
    if(this.props.didFetchClients){
      this.props.didFetchProjects ? null : this.props.fetchProjects()
    } else {
      this.props.fetchClients()
        .then(() => this.props.fetchProjects(this.props.clients))
    }
  }
}

const mapStateToProps = state => {
  return {
    projects: state.projects.list,
    clients: state.clients.list,
    selectedProject: state.projects.selectedProject,
    selectedClient: state.clients.selectedClient,
    didFetchClients: state.clients.didFetch,
    didFetchProjects: state.projects.didFetch
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchClients, fetchProjects, selectProject, destroyProject }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectContainer);
