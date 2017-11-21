import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addSchedule } from '../actions/schedule'
import { formatMoment, addToMoment } from '../helpers/momentHelper'


class NewScheduleForm extends Component{

  formatInitialDateValue = () => {
    return new Date().toISOString().slice(0,10)
  }

  state = {
    startDate: this.props.isModal ? this.props.start.slice(0,10) : this.formatInitialDateValue(),
    endDate: this.props.isModal ? this.props.end.slice(0,10) : this.formatInitialDateValue(),
    startTime: this.props.isModal ? this.props.start.slice(11,19) : "09:00",
    endTime: this.props.isModal ? this.props.end.slice(11,19) : "17:00",
    allDay: false
  }

  handleSubmit = (ev) => {
    ev.preventDefault()
    console.log(this, "from the submit");
    this.props.addSchedule({start: new Date(formatMoment(this.state.startDate + ' ' + this.state.startTime)), end: new Date(formatMoment(this.state.endDate + ' ' + this.state.endTime)), title:"test"})
    if(this.props.isModal){
      this.props.onAddSchedule()
    }
  }

  addSomeDate = (amount, type) => {
    this.setState({
      startDate: addToMoment(this.state.startDate, amount, type).slice(0, 10),
      endDate: addToMoment(this.state.endDate, amount, type).slice(0, 10)
    })
  }

  addADay = () => {
    this.addSomeDate(1, 'd')
  }

  addAWeek = () => {
    this.addSomeDate(1, 'w')
  }

  toToday = () => {
    this.setState({
      startDate: this.formatInitialDateValue(),
      endDate: this.formatInitialDateValue()
    })
  }

  loseADay = () => {
    this.addSomeDate(-1, 'd')
  }

  loseAWeek = () => {
    this.addSomeDate(-1, 'w')
  }

  handleStartDateChange = (ev) => {
    console.log(this.state);
    this.setState({startDate: ev.target.value})
  }

  handleStartTimeChange = (ev) => {
    this.setState({startTime: ev.target.value})
  }

  handleEndTimeChange = (ev) => {
    this.setState({endTime: ev.target.value})
  }

  handleEndDateChange = (ev) => {
    this.setState({endDate: ev.target.value})
  }

  render(){
    console.log(this.props, "Form Props");
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="">Start Date and Time</label>
          <input type="date" value={this.state.startDate} onChange={this.handleStartDateChange} />
          <input type="time" value={this.state.startTime} onChange={this.handleStartTimeChange} />
          <label htmlFor="">End Date and Time</label>
          <input type='date' value={this.state.endDate} min={this.state.startDate} onChange={this.handleEndDateChange} />
          <input type="time" value={this.state.endTime} onChange={this.handleEndTimeChange} />
          <input type='submit' value='submit' />
        </form>
        <br />
        <button onClick={this.loseAWeek}>Last Week</button>
        <button onClick={this.loseADay}>Previous Day</button>
        <button onClick={this.toToday}>Today</button>
        <button onClick={this.addADay}>Next Day</button>
        <button onClick={this.addAWeek}>Next Week</button>
      </div>
    )
  }
}

NewScheduleForm.defaultProps = {
  isModal: false,
  start: "",
  end: ""
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ addSchedule }, dispatch)
}

export default connect(null, mapDispatchToProps)(NewScheduleForm)
