import React, { Component } from 'react';
import { connect } from 'react-redux'
import Calendar from '../components/scheduleStuff/Calendar';
import NewScheduleForm from '../components/scheduleStuff/NewScheduleForm';
import { bindActionCreators } from 'redux';
import { fetchEmployees, selectEmployee } from '../actions/employee'
import { fetchSchedules } from '../actions/schedule'



class ScheduleContainer extends Component{

  state = {
    selectedEmployee: ""
  }

  onSelectEmployee = ev => {
    if(ev.target.value !== ""){
      this.setState({selectedEmployee: ev.target.value})
    }
  }

  onEmployeeClick = (employeeCUID) => {
    // console.log(employeeCUID, 'from Container');
    //Abandoned for later(?) Button too close to want a move
  }

  componentDidMount = () => {
    this.props.fetchEmployees()
      .then(() => {
        this.props.fetchSchedules(this.props.employees)
      })
    if(this.props.employees.length > 0){
      this.setState({
        selectedEmployee: this.props.employees[0].cuid
      })
    }
  }

  componentWillReceiveProps = nextProps => {
    if(nextProps.employees.length > 0 && this.state.selectedEmployee === ""){
      this.setState({
        selectedEmployee: nextProps.employees[0].cuid
      })
    }
  }

  render(){
    return(
      <div>
        <NewScheduleForm selectedEmployee={this.state.selectedEmployee} onSelectEmployee={this.onSelectEmployee} />
        <br /><br /><br />
        <Calendar onEmployeeClick={this.onEmployeeClick} selectedEmployee={this.state.selectedEmployee} employees={this.props.employees} onSelectEmployee={this.onSelectEmployee} schedules={this.props.schedules}/>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return{
    schedules: state.schedules.list,
    employees: state.employees.list
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchEmployees, fetchSchedules, selectEmployee }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleContainer);
