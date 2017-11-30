import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchServices } from './actions/service';
import { fetchClients } from './actions/client';
import { fetchProjects } from './actions/project';
import { fetchPieces } from './actions/piece';
import { fetchProcedures } from './actions/procedure';
import { fetchOperations } from './actions/operation';
import ScheduleContainer from './containers/ScheduleContainer';
import EmployeeContainer from './containers/EmployeeContainer';
import ServiceContainer from './containers/ServiceContainer';
import ClientContainer from './containers/ClientContainer';
import ProjectContainer from './containers/ProjectContainer';
import PieceContainer from './containers/PieceContainer';
import ProcedureContainer from './containers/ProcedureContainer';
import OperationContainer from './containers/OperationContainer';
import { Route } from 'react-router';
import { Sidebar, Segment, Button, Menu, Icon } from 'semantic-ui-react';

class App extends Component {

  state = {
    visible: false
  }

  toggleVisibility = () => this.setState({visible: !this.state.visible})

  handleScheduleClick = () => {
    this.props.history.push('/schedules')
  }

  handleEmployeeClick = () => {
    this.props.history.push('/employees')
  }

  handleServiceClick = () => {
    this.props.history.push('/services')
  }

  handleClientClick = () => {
    this.props.history.push('/clients')
  }

  handleProjectClick = () => {
    this.props.history.push('/projects')
  }

  handlePieceClick = () => {
    this.props.history.push('/pieces')
  }

  handleSummaryClick = () => {
    this.props.history.push('/currentProjects')
  }

  handleOperationClick = () => {
    this.props.history.push('/weeklyPlanner')
  }

  render() {
    return (
      <div>
        <Button onClick={this.toggleVisibility}>Menu</Button>
        <Sidebar.Pushable as={Segment} >
          <Sidebar as={Menu} animation='push' width='thin' visible={this.state.visible} icon='labeled' vertical inverted >
            <Menu.Item name='Schedules' onClick={this.handleScheduleClick}>
              <Icon name='calendar' />
              Schedules
            </Menu.Item>
            <Menu.Item name='Employees' onClick={this.handleEmployeeClick}>
              <Icon name='users' />
              Employees
            </Menu.Item>
            <Menu.Item name="Services" onClick={this.handleServiceClick}>
              <Icon name='archive' />
              Services
            </Menu.Item>
            <Menu.Item name='Clients' onClick={this.handleClientClick}>
              <Icon name='address card' />
              Clients
            </Menu.Item>
            <Menu.Item name='Projects' onClick={this.handleProjectClick}>
              <Icon name='tasks' />
              Projects
            </Menu.Item>
            <Menu.Item name='Pieces' onClick={this.handlePieceClick}>
              <Icon name='database' />
              Pieces
            </Menu.Item>
            <Menu.Item name='Summary' onClick={this.handleSummaryClick}>
              <Icon name='group object' />
              Current Projects
            </Menu.Item>
            <Menu.Item name='Planner' onClick={this.handleOperationClick}>
              <Icon name='add to calendar' />
              Planner
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              {/*}<Header as='h3'>Application Content</Header>
              Will have to import Header from semantic UI react*/}
              <Route path='/schedules' component={ScheduleContainer} />
              <Route path='/employees' component={EmployeeContainer} />
              <Route path='/services' component={ServiceContainer} />
              <Route path='/clients' component={ClientContainer} />
              <Route path='/projects' component={ProjectContainer} />
              <Route path='/pieces' component={PieceContainer} />
              <Route path='/currentProjects' component={ProcedureContainer} />
              <Route path='/weeklyPlanner' component={OperationContainer} />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }

  componentDidMount = () => {
    Promise.all([this.props.fetchServices(), this.props.fetchClients(), this.props.fetchProjects(), this.props.fetchPieces()])
      .then(() => this.props.fetchProcedures())
        .then(() => this.props.fetchOperations())
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchServices, fetchClients, fetchProjects, fetchPieces, fetchProcedures, fetchOperations }, dispatch)
}

// const mapStateToProps = () => {}

export default connect(null, mapDispatchToProps)(App);
