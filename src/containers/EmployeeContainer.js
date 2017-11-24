import React, { Component } from 'react';
import { connect } from 'react-redux';
import EmployeeList from '../components/employeeStuff/EmployeeList';
import NewEmployeeForm from '../components/employeeStuff/NewEmployeeForm';
import EmployeeShow from '../components/employeeStuff/EmployeeShow';
import { fetchEmployees, createEmployee, selectEmployee } from '../actions/employee';
import { bindActionCreators } from 'redux';
import { Route } from 'react-router'



class EmployeeContainer extends Component{

  handleNewEmployeeClick = ev => {
    this.props.history.push(`${this.props.match.path}/new`)
  }

  render(){
    return(
      <div>
        <Route exact path='/employees' render={() => (<button onClick={this.handleNewEmployeeClick} > Create New Employee</button>)} />
        <Route path='/employees/new' render={(props) => (<NewEmployeeForm {...props} onCreateEmployee={this.props.createEmployee}/>) } />
        <Route exact path='/employees' render={props => (<EmployeeShow />)} />
        <Route exact path='/employees' render={props => (<EmployeeList employees={this.props.employees} />)} />
      </div>
    )
  }

  componentDidMount = () => {
    this.props.fetchEmployees()
  }
}

const mapStateToProps = state => {
  return {
    employees: state.employees.list,
    selectedEmployee: state.employees.selectedEmployee
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchEmployees, createEmployee, selectEmployee }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeContainer);
