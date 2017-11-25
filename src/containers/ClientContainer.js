import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ClientList from '../components/clientStuff/ClientList';
import ClientShow from '../components/clientStuff/ClientShow';
import ClientModal from '../components/clientStuff/ClientModal';
import ClientForm from '../components/clientStuff/ClientForm';
import { fetchClients, selectClient, destroyClient } from '../actions/client';
import { Route } from 'react-router';

class ClientContainer extends Component{

  state = {
    modalOpen: false
  }

  handleNewClientClick = () => {
    this.props.history.push(`${this.props.match.path}/new`)
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
        <Route exact path='/clients' render={() => (<button onClick={this.handleNewClientClick} >New Client</button>) } /><br />
        <div className='ui grid'>
          <Route path='/clients/new' render={props => (<ClientForm {...props} />) } />

          <ClientList onSelectClient={this.props.selectClient} clients={this.props.clients} />

          {this.hasSelectedClient() > 0 ? (<Route exact path='/clients' render={() => <ClientShow client={this.props.selectedClient} onEditClick={this.onEditClick} onDeleteClick={this.onDeleteClick} />} />) : null}
        </div>

        <ClientModal modalOpen={this.state.modalOpen} onModalClose={this.onModalClose} client={this.props.selectedClient} />
      </div>
    )
  }

  componentDidMount = () => {
    this.props.didFetchClients ? null : this.props.fetchClients()
  }
}

const mapStateToProps = state => {
  return {
    clients: state.clients.list,
    didFetchClients: state.clients.didFetch,
    selectedClient: state.clients.selectedClient
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchClients, selectClient, destroyClient }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientContainer);
