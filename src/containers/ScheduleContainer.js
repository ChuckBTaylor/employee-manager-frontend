import React, { Component } from 'react';
import { connect } from 'react-redux'
import Calendar from '../components/scheduleStuff/Calendar';
import NewScheduleForm from '../components/scheduleStuff/NewScheduleForm';
import { bindActionCreators } from 'redux';
import { fetchEmployees } from '../actions/employee'
// import { addSchedule } from '../actions/schedule'


class ScheduleContainer extends Component{

  render(){
    return(
      <div>
        <NewScheduleForm />
        <br /><br /><br />
        <Calendar onAddSchedule={this.onAddSchedule} events={this.props.schedules}/>
      </div>
    )
  }

  componentDidMount = () => {
    this.props.fetchEmployees()
  }
}

const mapStateToProps = state => {
  return{
    schedules: state.schedules.list
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchEmployees }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleContainer);
