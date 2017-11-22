import React, { Component } from 'react';
import { connect } from 'react-redux'
import Calendar from '../components/scheduleStuff/Calendar';
import NewScheduleForm from '../components/scheduleStuff/NewScheduleForm';
import { bindActionCreators } from 'redux';
import { fetchEmployees } from '../actions/employee'
import { fetchSchedules } from '../actions/schedule'



class ScheduleContainer extends Component{

  onSelectEmployee = (ev) => {
    this.setState({selectedEmployee: ev.target.value})
  }

  render(){
    return(
      <div>
        <NewScheduleForm />
        <br /><br /><br />
        <Calendar onAddSchedule={this.onAddSchedule} employees={this.props.employees} schedules={this.props.schedules}/>
      </div>
    )
  }

  componentDidMount = () => {
    this.props.fetchEmployees()
      .then(() => {
        this.props.fetchSchedules(this.props.employees)
      })
  }
}

const mapStateToProps = state => {
  return{
    schedules: state.schedules.list,
    employees: state.employees.list
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchEmployees, fetchSchedules }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleContainer);
