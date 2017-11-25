import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ServiceList from '../components/serviceStuff/ServiceList';
import ServiceShow from '../components/serviceStuff/ServiceShow';
import ServiceModal from '../components/serviceStuff/ServiceModal';
import ServiceForm from '../components/serviceStuff/ServiceForm';
import { fetchServices, selectService, destroyService } from '../actions/service';
import { Route } from 'react-router';

class ServiceContainer extends Component{

  state = {
    modalOpen: false
  }

  handleNewServiceClick = () => {
    this.props.history.push(`${this.props.match.path}/new`)
  }

  onEditClick = () => {
    this.setState({modalOpen: true})
  }

  onDeleteClick = () => {
    this.props.destroyService(this.props.selectedService)
  }

  onModalClose = () => {
    this.setState({modalOpen: false})
  }

  hasSelectedService = () => {
    return !!(Object.keys(this.props.selectedService).length > 0)
  }

  render(){
    return(
      <div>
        <Route exact path='/services' render={() => (<button onClick={this.handleNewServiceClick} >New Service</button>) } /><br />
        <div className='ui grid'>
          <Route path='/services/new' render={props => (<ServiceForm {...props} />) } />

          <ServiceList onSelectService={this.props.selectService} services={this.props.services} />

          {this.hasSelectedService() > 0 ? (<Route exact path='/services' render={() => <ServiceShow service={this.props.selectedService} onEditClick={this.onEditClick} onDeleteClick={this.onDeleteClick} />} />) : null}
        </div>

        <ServiceModal modalOpen={this.state.modalOpen} onModalClose={this.onModalClose} service={this.props.selectedService} />
      </div>
    )
  }

  componentDidMount = () => {
    this.props.didFetchServices ? null : this.props.fetchServices()
  }
}

const mapStateToProps = state => {
  return {
    services: state.services.list,
    didFetchServices: state.services.didFetch,
    selectedService: state.services.selectedService
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchServices, selectService, destroyService }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceContainer);
