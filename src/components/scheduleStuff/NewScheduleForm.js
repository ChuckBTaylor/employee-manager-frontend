import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSchedule, patchSchedule, destroySchedule } from '../../actions/schedule'
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
    allDay: false,
    description: this.props.isModal ? this.props.description : ""
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

  handleSelectedUserChange = ev => {
    this.setState({
      selectedEmployee: ev.target.value
    })
  }

  handleStartDateChange = ev => {
    this.setState({startDate: ev.target.value})
  }

  handleStartTimeChange = ev => {
    this.setState({startTime: ev.target.value})
  }

  handleEndTimeChange = ev => {
    this.setState({endTime: ev.target.value})
  }

  handleEndDateChange = ev => {
    this.setState({endDate: ev.target.value})
  }

  handleDescriptionChange = ev => {
    this.setState({description: ev.target.value})
  }

  handleDelete = ev => {
    const employeeID = findByCUID(this.props.employees, this.props.selectedEmployee).id
    this.props.destroySchedule({cuid: this.props.cuid, id: this.props.id, employeeID: employeeID})
    this.props.onAddSchedule()
  }

  handleSubmit = ev => {
    ev.preventDefault()
    const employee = findByCUID(this.props.employees, this.props.selectedEmployee)
    if(this.props.isEdit){
      this.props.patchSchedule({
        start: new Date(formatMoment(this.state.startDate + ' ' + this.state.startTime)),
        end: new Date(formatMoment(this.state.endDate + ' ' + this.state.endTime)),
        title: this.state.description,
        employeeID: employee.id,
        employeeCUID: employee.cuid,
        description: this.state.description,
        cuid: this.props.cuid,
        id: this.props.id
      })
    } else {
      this.props.createSchedule({
        start: new Date(formatMoment(this.state.startDate + ' ' + this.state.startTime)),
        end: new Date(formatMoment(this.state.endDate + ' ' + this.state.endTime)),
        title: this.state.description,
        employeeID: employee.id,
        employeeCUID: employee.cuid,
        description: this.state.description
      })
    }
    if(this.props.isModal){
      this.props.onAddSchedule()
    }
    this.setState({description: ""})
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
    const employee = findByCUID(this.props.employees, this.props.selectedEmployee)
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
          <label htmlFor="">Description: </label>
          <input type="text" value={this.state.description} onChange={this.handleDescriptionChange} />
          <br />
          <select className="ui search dropdown" value={this.props.selectedEmployee} onChange={this.props.onSelectEmployee} >
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
        <br />
        {this.props.isEdit ? <button onClick={this.handleDelete}>Delete</button> : null}
      </div>
    )
  }
}

NewScheduleForm.defaultProps = {
  isModal: false,
  start: "",
  end: "",
  selectedEmployee: "",
  isEdit: false,
  cuid: "",
  id: 0
}

const mapStateToProps = state => {
  return{
    employees: state.employees.list
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ createSchedule, patchSchedule, destroySchedule }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NewScheduleForm)
