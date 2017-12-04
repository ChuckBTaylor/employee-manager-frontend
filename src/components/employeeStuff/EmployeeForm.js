import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createEmployee, patchEmployee } from '../../actions/employee'

class EmployeeForm extends Component{

  state = {
    name: this.props.isModal ? this.props.employee.name : "",
    scheduleColor: this.props.isModal ? this.props.employee.scheduleColor : "#000000",
    isAdmin: this.props.isModal ? this.props.employee.isAdmin : false,
    password: "",
    passwordConfirmation: "",
    showPWs: false
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

  handlePasswordChange = ev => {
    this.setState({password: ev.target.value})
  }

  handlePwConfirmationChange = ev => {
    this.setState({passwordConfirmation: ev.target.value})
  }

  handleShowChange = ev => {
    this.setState({showPWs: !this.state.showPWs})
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
    console.log(this);
    return(
      <div className='sixteen wide column'>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-employee-name">Employee Name: </label>
          <input id="new-employee-name" type='text' onChange={this.handleNameChange} value={this.state.name}/>
          <br />
          <label htmlFor="new-employee-color">Employee Calendar Color: </label>
          <input id='new-employee-color' type="color" value={this.state.scheduleColor} onChange={this.handleColorChange} />
          <br />
          <label htmlFor="">Password: </label>
          <input type={this.state.showPWs ? 'text' : 'password'} value={this.state.password} onChange={this.handlePasswordChange} />
          <br />
          <label htmlFor="">Password Confirmation: </label>
          <input type={this.state.showPWs ? 'text' : 'password'} value={this.state.passwordConfirmation} onChange={this.handlePwConfirmationChange} />
          <br />
          <p onClick={this.handleShowChange}>Show Passwords: <i style={{color: 'black'}} className={this.state.showPWs ? "toggle on icon" : "toggle off icon"} /></p>
          <p onClick={this.handleAdminChange}>
            {this.state.isAdmin ? "Is an Admin" : "Not an Admin"}
            <i style={{color: this.state.isAdmin ? 'green' : 'red'}} className={this.state.isAdmin ? 'checkmark box icon' : "remove circle outline icon"} />
          </p>
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
    isAdmin: false,
    id: -1
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ createEmployee, patchEmployee }, dispatch)
}


export default connect(null, mapDispatchToProps)(EmployeeForm);
