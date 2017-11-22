import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSchedule } from '../../actions/schedule'
import { formatMoment, addToMoment } from '../../helpers/momentHelper'
import { findByCUID } from '../../helpers/generalHelpers';


class NewScheduleForm extends Component{

  formatInitialDateValue = () => {
    return formatMoment(new Date()).slice(0,10)
  }

  state = {
    startDate: this.props.isModal ? this.props.start.slice(0,10) : this.formatInitialDateValue(),
    endDate: this.props.isModal ? this.props.end.slice(0,10) : this.formatInitialDateValue(),
    startTime: this.props.isModal ? this.props.start.slice(11,19) : "09:00",
    endTime: this.props.isModal ? this.props.end.slice(11,19) : "17:00",
    selectedEmployee: "",
    allDay: false,
    description: ""
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

  handleSelectedUserChange = (ev) => {
    this.setState({
      selectedEmployee: ev.target.value
    })
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

  handleSubmit = (ev) => {
    ev.preventDefault()
    const employee = findByCUID(this.props.employees, this.state.selectedEmployee)
    this.props.createSchedule({start: new Date(formatMoment(this.state.startDate + ' ' + this.state.startTime)), end: new Date(formatMoment(this.state.endDate + ' ' + this.state.endTime)), title:"test", employeeID: employee.id, employeeCUID: this.state.selectedEmployee, description: this.state.description})
    if(this.props.isModal){
      this.props.onAddSchedule()
    }
  }

  componentDidMount = () => {
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
    const employeeOptions = this.props.employees.map(employee => (<option data-color={employee.scheduleColor} key={employee.cuid} value={employee.cuid} >{employee.name}</option>))
    const employee = findByCUID(this.props.employees, this.state.selectedEmployee)
    console.log("Schedule Form", this.state);
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="">Start Date and Time</label>
          <input type="date" value={this.state.startDate} onChange={this.handleStartDateChange} />
          <input type="time" value={this.state.startTime} onChange={this.handleStartTimeChange} />
          <label htmlFor="">End Date and Time</label>
          <input type='date' value={this.state.endDate} min={this.state.startDate} onChange={this.handleEndDateChange} />
          <input type="time" value={this.state.endTime} onChange={this.handleEndTimeChange} />
          <br />
          <select className="ui search dropdown" value={this.state.selectedEmployee} onChange={this.handleSelectedUserChange} >
            {employeeOptions}
          </select>
          Employee Color: <i style={{color: employee ? employee.scheduleColor : "#000000"}} className="circle icon"></i>
          <br />
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

const mapStateToProps = state => {
  return{
    employees: state.employees.list
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ createSchedule }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NewScheduleForm)
