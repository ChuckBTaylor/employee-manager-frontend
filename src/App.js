import React, { Component } from 'react';
import './App.css';
import ScheduleContainer from './containers/ScheduleContainer'
import { connect } from 'react-redux';

class App extends Component {

  onAddEvent = (newEvent) => {
  }

  render() {
    return (
      <div>
        <ScheduleContainer />
      </div>
    );
  }
}

const mapStateToProps = () => {

}

export default App;
