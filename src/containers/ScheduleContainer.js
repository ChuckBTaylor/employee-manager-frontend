import React, { Component } from 'react';
import { connect } from 'react-redux'
import Calendar from '../components/scheduleStuff/Calendar';
import NewScheduleForm from '../components/scheduleStuff/NewScheduleForm';
import { bindActionCreators } from 'redux';
import { fetchEmployees, selectEmployee } from '../actions/employee'
import { fetchSchedules } from '../actions/schedule'



class ScheduleContainer extends Component{

  state = {
    selectedEmployee: -1
  }

  onSelectEmployee = ev => {
    if(ev.target.value !== ""){
      this.setState({selectedEmployee: +ev.target.value})
    }
  }

  onEmployeeClick = employeeID => {
    // log(employeeID, 'from Container');
    //Abandoned for later(?) Button too close to want a move
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

  componentDidMount = () => {
    if(!this.props.didFetchEmployees){
      this.props.fetchEmployees()
        .then(() => this.props.fetchSchedules())
    } else {
      if(!this.props.didFetchSchedules){
        this.props.fetchSchedules()
      }
    }

    if(this.props.employees.length > 0){
      this.setState({
        selectedEmployee: this.props.employees[0].id
      })
    }
  }

  componentWillReceiveProps = nextProps => {
    if(nextProps.employees.length > 0 && this.state.selectedEmployee === -1){
      this.setState({
        selectedEmployee: nextProps.employees[0].id
      })
    }
  }

}

const mapStateToProps = state => {
  return{
    schedules: state.schedules.list,
    employees: state.employees.list,
    didFetchEmployees: state.employees.didFetch,
    didFetchSchedules: state.schedules.didFetch
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchEmployees, fetchSchedules, selectEmployee }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleContainer);
