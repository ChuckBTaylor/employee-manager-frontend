import React, { Component } from 'react';
import { connect } from 'react-redux'
import EmployeeList from '../components/employeeStuff/EmployeeList'
import { fetchEmployees } from '../actions/employee'
import { bindActionCreators } from 'redux';

class EmployeeContainer extends Component{

  render(){
    return(
      <div>
        <EmployeeList employees={this.props.employees} />
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
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchEmployees }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeContainer);
