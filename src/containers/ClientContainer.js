import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ClientList from '../components/clientStuff/ClientList';
import ClientShow from '../components/clientStuff/ClientShow';
import ClientModal from '../components/clientStuff/ClientModal';
import ClientForm from '../components/clientStuff/ClientForm';
import { fetchClients, selectClient, destroyClient } from '../actions/client';
import { fetchProjects, selectProject } from '../actions/project';
import { Route } from 'react-router';

class ClientContainer extends Component{

  state = {
    modalOpen: false
  }

  handleNewClientClick = () => {
    this.props.history.push(`${this.props.match.path}/new`)
  }

  onSelectProject = project => {
    this.props.selectProject(project)
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

  render(){
    return(
      <div>
        <div className='ui grid'>
          <Route path='/clients/new' render={props => (<ClientForm {...props} />) } />

          <ClientList onSelectClient={this.props.selectClient} clients={this.props.clients} />

          {this.hasSelectedClient() > 0 ? (<Route path='/clients' render={() => <ClientShow client={this.props.selectedClient} projects={this.props.clientProjects} onEditClick={this.onEditClick} onDeleteClick={this.onDeleteClick} onSelectProject={this.onSelectProject} onNewProjectClick={this.onNewProjectClick} />} />) : null}
        </div>
        <Route exact path='/clients' render={() => (<button onClick={this.handleNewClientClick} >New Client</button>) } /><br />
        <ClientModal modalOpen={this.state.modalOpen} onModalClose={this.onModalClose} client={this.props.selectedClient} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    clients: state.clients.list,
    clientProjects: state.projects.clientProjects,
    didFetchClients: state.clients.didFetch,
    selectedClient: state.clients.selectedClient
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchClients, selectClient, destroyClient, fetchProjects, selectProject }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientContainer);
