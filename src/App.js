import React, { Component } from 'react';
import './App.css';
import ScheduleContainer from './containers/ScheduleContainer';
import EmployeeContainer from './containers/EmployeeContainer';
import NavBar from './components/NavBar';
import { Route } from 'react-router';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';

class App extends Component {

  onAddEvent = (newEvent) => {
  }

  render() {
    return (
      <div>
        <Route path='/' component={NavBar} />
        <Route path='/schedules' component={ScheduleContainer} />
        <Route path='/employees' component={EmployeeContainer} />
      </div>
    );
  }
}

// const mapStateToProps = () => {}

export default App;
