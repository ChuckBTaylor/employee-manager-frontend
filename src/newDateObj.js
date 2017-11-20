import React, { Component } from 'react';
import moment from 'moment'
class NewDateForm extends Component{

  state = {
    start: "",
    end: ""
  }

  handleSubmit = (ev) => {
    ev.preventDefault()
    const moment = require('moment')
    const start = this.state.start
    const end = this.state.end
    this.props.onAddEvent({start: new Date(moment(this.state.start).format()), end: new Date(moment(this.state.end).format()), title:"test"})
    this.setState({start: "", end: ""})
  }

  handleNameChange = (ev) => {
    this.setState({start: ev.target.value})
  }

  handlePasswordChange = (ev) => {
    this.setState({end: ev.target.value})
  }

  render(){
    return(
    <form onSubmit={this.handleSubmit}>
      <label htmlFor="">Start Time</label>
      <input type='date' value={this.state.start} onChange={this.handleNameChange} />
      <label htmlFor="">End Time</label>
      <input type='date' value={this.state.end} onChange={this.handlePasswordChange} />
      <input type='submit' value='submit' />
    </form>
    )
  }
}

export default NewDateForm
