import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EmployeeList from '../components/employeeStuff/EmployeeList';
import EmployeeModal from '../components/employeeStuff/EmployeeModal';
import EmployeeForm from '../components/employeeStuff/EmployeeForm';
import EmployeeShow from '../components/employeeStuff/EmployeeShow';
import { fetchEmployees, selectEmployee, destroyEmployee } from '../actions/employee';
import { Route } from 'react-router'



class EmployeeContainer extends Component{

  state = {
    modalOpen: false
  }

  onEditClick = () => {
    this.setState({modalOpen: true})
  }

  onDeleteClick = () => {
    this.props.destroyEmployee(this.props.selectedEmployee)
  }

  onModalClose = () => {
    this.setState({modalOpen: false})
  }

  handleNewEmployeeClick = () => {
    this.props.history.push(`${this.props.match.path}/new`)
  }

  hasSelectedEmployee = () => {
    return !!(Object.keys(this.props.selectedEmployee).length > 0)
  }

  render(){
    return(
      <div>
        <Route exact path='/employees' render={() => (<button onClick={this.handleNewEmployeeClick} > Create New Employee</button>)} />

        <div className='ui grid'>
          <Route path='/employees/new' render={props => (<EmployeeForm {...props} />) } />

          <EmployeeList employees={this.props.employees} onSelectEmployee={this.props.selectEmployee} />

          {this.hasSelectedEmployee() ? (<Route exact path='/employees' render={() => (<EmployeeShow employee={this.props.selectedEmployee} onDeleteClick={this.onDeleteClick} onEditClick={this.onEditClick} />)} />) : null}
        </div>

        <EmployeeModal modalOpen={this.state.modalOpen} onModalClose={this.onModalClose} employee={this.props.selectedEmployee} />
      </div>
    )
  }

  componentDidMount = () => {
    this.props.didFetchEmployees ? null : this.props.fetchEmployees()
  }
}

const mapStateToProps = state => {
  return {
    employees: state.employees.list,
    selectedEmployee: state.employees.selectedEmployee,
    didFetchEmployees: state.employees.didFetch
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchEmployees, selectEmployee, destroyEmployee }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeContainer);
