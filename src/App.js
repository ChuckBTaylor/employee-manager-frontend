import React, { Component } from 'react';
import './App.css';
import ScheduleContainer from './containers/ScheduleContainer'
import EmployeeContainer from './containers/EmployeeContainer'
import NavBar from './components/NavBar'
// import { connect } from 'react-redux';
import { Route } from 'react-router'

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
