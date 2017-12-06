import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProjectList from '../components/projectStuff/ProjectList';
import ProjectShow from '../components/projectStuff/ProjectShow';
import ProjectModal from '../components/projectStuff/ProjectModal';
import ProjectForm from '../components/projectStuff/ProjectForm';
import ProjectTimeChart from '../components/chartStuff/ProjectTimeChart';
import { fetchPieces, selectPiece } from '../actions/piece';
import { fetchProjects, selectProject, destroyProject, fetchProjectData, clearProjectData } from '../actions/project';
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

  onNewPieceClick = () => {
    this.props.history.push('/pieces/new')
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
    return Object.keys(this.props.selectedProject).length > 0
  }

  render(){
    const clientOptions = this.props.clients.map((client, idx) => (<option value={client.id} key={idx*10}>{client.name}</option>))

    const filteredProjects = (this.state.filteredClient === -1) ? (this.props.projects) : (this.props.projects.filter(project => project.clientID === this.state.filteredClient))

    return(
      <div>
        <div className='ui grid'>
          <Route path='/projects/new' render={props => (<ProjectForm {...props} clients={this.props.clients}  selectedClient={this.props.selectedClient }/>) } />

          <ProjectList onSelectProject={this.onSelectProject} projects={filteredProjects} />

          {this.hasSelectedProject() ? (<Route path='/projects' render={() => (
            <ProjectShow
              project={this.props.selectedProject}
              pieces={this.props.projectPieces}
              client={this.props.selectedClient}
              onEditClick={this.onEditClick}
              onDeleteClick={this.onDeleteClick}
              onSelectPiece={this.onSelectPiece}
              onNewPieceClick={this.onNewPieceClick}
            />
          )} />) : null}
          {this.hasSelectedProject() ? (<Route path='/projects' render={() => (
            <ProjectTimeChart chartData={[this.props.chartData]} safe={this.props.chartData.totalEst >= this.props.chartData.totalWorked} />
          )} />) : null}
        </div>
        <br />
        <label htmlFor="client-project-filter">Filter Projects By Client: </label>
        <select id='client-project-filter' onChange={this.handleFilterChange} value={this.state.filteredClient} >
          <option value={-1} >All</option>
          {clientOptions}
        </select>
        <br />
        <Route exact path='/projects' render={() => (<button onClick={this.handleNewProjectClick} >New Project</button>) } />
        <br />
        <ProjectModal
          modalOpen={this.state.modalOpen}
          onModalClose={this.onModalClose}
          project={this.props.selectedProject}
          clients={this.props.clients}
          selectedClient={this.props.selectedClient}
        />
      </div>
    )
  }

  componentDidMount = () => {
    if(this.hasSelectedProject() && !this.props.didFetchChartData){
      this.props.fetchProjectData(this.props.selectedProject.id)
    }
  }

  componentWillReceiveProps = nextProps => {
    console.log('projectContainer Receiving Props', nextProps);
    if(nextProps.selectedProject.id && this.somethingChanged(nextProps)){
      this.props.fetchProjectData(nextProps.selectedProject.id)
    }
  }

  somethingChanged = nextProps => {
    if(nextProps.selectedProject.id !== this.props.selectedProject.id) return true
    if(nextProps.projectPieces.length !== this.props.projectPieces.length) return true
    return false
  }

  componentWillUnmount = () => {
    this.props.clearProjectData()
  }

  // componentDidMount = () => {
  //   if(this.props.didFetchClients){
  //     if(this.props.didFetchProjects){
  //       if(!this.props.didFetchPieces){
  //         this.props.fetchPieces()
  //       }
  //     } else {
  //       this.props.fetchProjects()
  //         .then(() => this.props.fetchPieces(this.props.projects))
  //     }
  //   } else {
  //     this.props.fetchClients()
  //       .then(() => this.props.fetchProjects(this.props.clients))
  //         .then(() => this.props.fetchPieces(this.props.projects))
  //   }
  // }
}

const mapStateToProps = state => {
  return {
    projects: state.projects.list,
    clients: state.clients.list,
    projectPieces: state.pieces.projectPieces,
    selectedProject: state.projects.selectedProject,
    selectedClient: state.clients.selectedClient,
    didFetchClients: state.clients.didFetch,
    didFetchProjects: state.projects.didFetch,
    chartData: state.charts.projectData,
    didFetchChartData: state.charts.didFetchProject
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchClients, fetchProjects, selectProject, destroyProject, fetchPieces, selectPiece, fetchProjectData, clearProjectData }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectContainer);
