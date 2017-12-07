import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import ClientList from '../components/clientStuff/ClientList';
// import ClientShow from '../components/clientStuff/ClientShow';
import ClientModal from '../components/clientStuff/ClientModal';
import ClientForm from '../components/clientStuff/ClientForm';
import ClientCard from '../components/clientStuff/ClientCard';
import { fetchClients, selectClient, destroyClient } from '../actions/client';
import { fetchProjects, selectProject, createProject } from '../actions/project';
// import { Route } from 'react-router';
import { findByID } from '../helpers/generalHelpers';
// import { Grid } from 'semantic-ui-react';
import cuid from 'cuid';

class ClientContainer extends Component{

  state = {
    modalOpen: false
  }

  onNewProjectClick = () => {
    this.props.history.push('/projects/new')
  }

  onEditClick = () => {
    this.setState({modalOpen: true})
  }

  onDeleteClick = () => {
    this.props.destroyClient(this.props.selectedClient)
  }

  onModalClose = () => {
    this.setState({modalOpen: false})
  }

  hasSelectedClient = () => {
    return !!(Object.keys(this.props.selectedClient).length > 0)
  }

  onSelectClient = client => {
    this.props.selectClient(client)
    this.setState({modalOpen: true})
  }

  onSelectProject = projectID => {
    this.props.selectProject(findByID(this.props.projects, projectID))
    this.props.history.push('/projects')
  }

  render(){
    const clientDivs = this.props.clients.map(client => {
      const clientProjects = this.props.projects.filter(project => project.clientID === client.id)
      return (<ClientCard key={cuid()} client={client} projects={clientProjects} onCreateProject={this.props.createProject} onSelectClient={this.onSelectClient} onSelectProject={this.onSelectProject}/>)
    })
    return(
      <div>
        <h1 className='ui center aligned header'>Clients</h1>
        <div className='ui centered grid'>
          {clientDivs}
        </div>
        <ClientForm />
        <ClientModal
          client={this.props.selectedClient}
          modalOpen={this.state.modalOpen}
          onModalClose={this.onModalClose}
          onDestroyClient={this.props.destroyClient}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    clients: state.clients.list,
    clientProjects: state.projects.clientProjects,
    didFetchClients: state.clients.didFetch,
    selectedClient: state.clients.selectedClient,
    projects: state.projects.list
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchClients, selectClient, destroyClient, fetchProjects, selectProject, createProject }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientContainer);
