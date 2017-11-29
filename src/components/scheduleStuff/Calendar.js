import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import NewScheduleModal from './NewScheduleModal'
import { formatMoment } from '../../helpers/momentHelper'
import { findByID } from '../../helpers/generalHelpers'


BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

class Calendar extends Component{

  state = {
    modalOpen: false,
    selectedStart: "",
    selectedEnd: "",
    filteredEmployee: "",
    isEdit: false,
    selectedID: 0,
    selectedDescription: ""
  }

  handleFilterChange = ev => {
    this.setState({filteredEmployee: ev.target.value})
    this.props.onSelectEmployee(ev)
  }

  handleSelect = (selectedInfo) => {
    this.setState({modalOpen: true, selectedStart: formatMoment(selectedInfo.start), selectedEnd: formatMoment(selectedInfo.end)})
  }

  onModalClose = () => {
    this.setState({modalOpen: false, selectedStart: "", selectedEnd: "", isEdit: false, selectedID: -1, selectedDescription: ""})
  }

  getScheduleProps = ev => {
    const color = findByID(this.props.employees, ev.employeeID).scheduleColor
    return{style: {backgroundColor: color}, title: ev.description}
  }

  handleSelectSchedule = (schedule) => {
    this.props.onSelectEmployee({target: {value: schedule.employeeID}})

    this.setState({modalOpen: true, selectedStart: formatMoment(schedule.start), selectedEnd: formatMoment(schedule.end), selectedEmployee: schedule.selectedEmployee, isEdit: true, selectedID: schedule.id, selectedDescription: schedule.description})
  }

  handleEmployeeClick = ev => {
    this.props.onEmployeeClick(ev.target.dataset.id)
  }

  render(){

    const selectOptions = this.props.employees.map(employee => (<option value={employee.id} key={employee.id + "filter"}>{employee.name}</option>))

    const filteredSchedules = this.state.filteredEmployee === "" ? this.props.schedules : this.props.schedules.filter(sched => sched.employeeID === this.state.filteredEmployee)
    const withTitle = filteredSchedules.map(sched => ({...sched, title: sched.description}))

    const employeeColors = this.props.employees.map(emp => {return <div key={emp.id} className="four wide column" onClick={this.handleEmployeeClick} data-id={emp.id}><i className="circle icon" style={{color: emp.scheduleColor}}></i>{emp.name}</div>})

    return(
      <div>
        <NewScheduleModal start={this.state.selectedStart} end={this.state.selectedEnd} onModalClose={this.onModalClose} modalOpen={this.state.modalOpen} selectedEmployee={this.props.selectedEmployee} onSelectEmployee={this.props.onSelectEmployee} isEdit={this.state.isEdit} id={this.state.selectedID} description={this.state.selectedDescription}/>
        <div>
          <select name="employees" multiple="" className="ui fluid dropdown" onChange={this.handleFilterChange}>
            <option value="">Filter By Employee</option>
            {selectOptions}
          </select>
        </div>
        <div className="ui grid">
        {employeeColors}
        </div>
        <br />
        <BigCalendar
          selectable
          {...this.props}
          events={withTitle}
          eventPropGetter={this.getScheduleProps}
          timeslots={6}
          step={15}
          defaultView='week'
          defaultDate={new Date()}
          onSelectEvent={schedule=>this.handleSelectSchedule(schedule)}

          onSelectSlot={(slotInfo) => {
            this.handleSelect(slotInfo)
          }}
        />
      </div>
    )
  }
}

export default Calendar;
