import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchServices } from '../actions/service';
import { fetchClients } from '../actions/client';
import { fetchProjects } from '../actions/project';
import { fetchPieces } from '../actions/piece';
import { fetchProcedures } from '../actions/procedure';
import { fetchEmployees, logOutEmployee } from '../actions/employee';
import { fetchPlanners, fetchPPs } from '../actions/planner';
import ScheduleContainer from '../containers/ScheduleContainer';
import EmployeeContainer from '../containers/EmployeeContainer';
import ServiceContainer from '../containers/ServiceContainer';
import ClientContainer from '../containers/ClientContainer';
import ProjectContainer from '../containers/ProjectContainer';
import PieceContainer from '../containers/PieceContainer';
import ProcedureContainer from '../containers/ProcedureContainer';
import OperationContainer from '../containers/OperationContainer';
import LogOutComponent from '../components/LogOutComponent';
import { Route } from 'react-router';
import { Sidebar, Segment, Button, Menu, Icon } from 'semantic-ui-react';
import { Switch } from 'react-router-dom';
import { authorize } from '../HOCs/authorize'
import 'semantic-ui-css/semantic.min.css';

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

  handleLogOutClick = () => {
    this.props.history.push('/logout')
  }

  onLogOut = () => {
    this.props.logOutEmployee()
  }

  render() {
    const AuthSchedule = authorize(ScheduleContainer)
    const AuthEmployee = authorize(EmployeeContainer)
    const AuthClient = authorize(ClientContainer)
    const AuthProject = authorize(ProjectContainer)
    const AuthPiece = authorize(PieceContainer)
    const AuthService = authorize(ServiceContainer)
    const AuthProcedure = authorize(ProcedureContainer)
    const AuthOperation = authorize(OperationContainer)
    const AuthLogOut = authorize(LogOutComponent)

    return (
      <div className='main-div'>
      <Route path='/' render={props => {
          return (<div>
            <Button onClick={this.toggleVisibility}>Menu</Button>
            <Sidebar.Pushable as={Segment} style={{ minHeight: 1000, padding: '1em 0em' }}>
              <Sidebar as={Menu} animation='push' width='thin' visible={this.state.visible} icon='labeled' vertical inverted >
                <Menu.Item name='Planner' onClick={this.handleOperationClick}>
                  <Icon name='add to calendar' />
                  Planner
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
                <Menu.Item name='Summary' onClick={this.handleSummaryClick}>
                  <Icon name='group object' />
                  Current Projects
                </Menu.Item>
                <Menu.Item name='Log Out' onClick={this.handleLogOutClick}>
                  <Icon name='window close' />
                  Log Out
                </Menu.Item>
              </Sidebar>
              <Sidebar.Pusher>
                <Segment basic>
                  {/*}<Header as='h3'>Application Content</Header>
                  Will have to import Header from semantic UI react*/}
                  <Switch>
                    <Route path='/schedules' render={props => (<AuthSchedule {...props} />)} />
                    <Route path='/employees' render={props => (<AuthEmployee {...props} />)} />
                    <Route path='/services' render={props => (<AuthService {...props} />)} />
                    <Route path='/clients' render={props => (<AuthClient {...props} />)} />
                    <Route path='/projects' render={props => (<AuthProject {...props} />)} />
                    <Route path='/pieces' render={props => (<AuthPiece {...props} />)} />
                    <Route path='/currentProjects' render={props => (<AuthProcedure {...props} />)} />
                    <Route path='/weeklyPlanner' render={props => (<AuthOperation {...props} />)} />
                    <Route path='/logout' render={props => (<AuthLogOut {...props} onLogOut={this.onLogOut} />)} />
                  </Switch>
                </Segment>
              </Sidebar.Pusher>
            </Sidebar.Pushable>
          </div>)
        }} />
      </div>
    );
  }

  componentDidMount = () => {
    if (!this.props.didFetch) {
      Promise.all([this.props.fetchServices(), this.props.fetchClients(), this.props.fetchProjects(), this.props.fetchPieces()])
        .then(() => this.props.fetchProcedures())
          .then(() => this.props.fetchPlanners())
      this.props.fetchEmployees()
    }
  }

}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchServices, fetchClients, fetchProjects, fetchPieces, fetchProcedures, fetchEmployees, fetchPPs, fetchPlanners, logOutEmployee }, dispatch)
}

const mapStateToProps = state => {
  return {
    didFetch: state.planners.didFetch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
