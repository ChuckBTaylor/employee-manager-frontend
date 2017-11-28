import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createEmployee, patchEmployee } from '../../actions/employee'

class EmployeeForm extends Component{

  state = {
    name: this.props.isModal ? this.props.employee.name : "",
    scheduleColor: this.props.isModal ? this.props.employee.scheduleColor : "#000000",
    isAdmin: this.props.isModal ? this.props.employee.isAdmin : false
  }

  handleNameChange = ev => {
    this.setState({name: ev.target.value})
  }

  handleColorChange = ev => {
    this.setState({scheduleColor: ev.target.value})
  }

  handleAdminChange = ev => {
    this.setState({isAdmin: !this.state.isAdmin})
  }

  formOkay = () => {
    if(this.state.name === "") return false
    return true
  }

  handleSubmit = ev => {
    ev.preventDefault()
    if(this.formOkay()){
      if(this.props.isModal){
        this.props.patchEmployee({...this.props.employee, ...this.state})
        this.props.onModalClose()
      } else {
        this.props.createEmployee(this.state)
        this.props.history.push(`/employees`)
      }
    } else {
      alert("Something is wrong!")
    }
  }

  render(){
    return(
      <div className='sixteen wide column'>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-employee-name">Employee Name: </label>
          <input id="new-employee-name" type='text' onChange={this.handleNameChange} value={this.state.name}/>
          <br />
          <label htmlFor="new-employee-color">Employee Calendar Color: </label>
          <input id='new-employee-color' type="color" value={this.state.scheduleColor} onChange={this.handleColorChange} />
          <br />
          <p onClick={this.handleAdminChange}>{this.state.isAdmin ? "Is an Admin" : "Not an Admin"}</p>
          <input type='submit' />
        </form>
      </div>
    )
  }
}

EmployeeForm.defaultProps = {
  isModal: false,
  employee: {
    name: "",
    scheduleColor: "#000000",
    isAdmin: false
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ createEmployee, patchEmployee }, dispatch)
}


export default connect(null, mapDispatchToProps)(EmployeeForm);
