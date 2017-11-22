import React, { Component } from 'react';
import { createEmployee } from '../../actions/employee'

class NewEmployeeForm extends Component{

  state = {
    name: "",
    scheduleColor: "#000000",
    isAdmin: false
  }

  handleNameChange = (ev) => {
    this.setState({name: ev.target.value})
  }

  handleColorChange = ev => {
    this.setState({scheduleColor: ev.target.value})
  }

  handleAdminChange = ev => {
    this.setState({isAdmin: !this.state.isAdmin})
  }

  handleSubmit = (ev) => {
    ev.preventDefault()
    this.props.onCreateEmployee(this.state)
    this.props.history.push(`/employees`)
  }

  render(){
    console.log(this.state);
    return(
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="new-employee-name">Employee Name: </label>
        <input id="new-employee-name" type='text' onChange={this.handleNameChange} value={this.state.name}/>
        <br />
        <label htmlFor="new-employee-color">Employee Calendar Color: </label>
        <input id='new-employee-color' type="color" value={this.state.newColor} onChange={this.handleColorChange} />
        <br />
        <p onClick={this.handleAdminChange}>{this.state.isAdmin ? "Is an Admin" : "Not an Admin"}</p>
        <input type='submit' />
      </form>
    )
  }
}


export default NewEmployeeForm;
