import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import NewScheduleModal from './NewScheduleModal'
import { formatMoment } from '../../helpers/momentHelper'
import { findByCUID } from '../../helpers/generalHelpers'


BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

class Calendar extends Component{

  state = {
    modalOpen: false,
    selectedStart: "",
    selectedEnd: "",
    filteredEmployee: "",
    isEdit: false,
    selectedCUID: ""
  }

  handleFilterChange = ev => {
    this.setState({filteredEmployee: ev.target.value})
    this.props.onSelectEmployeeev
  }

  handleSelect = (selectedInfo) => {
    this.setState({modalOpen: true, selectedStart: formatMoment(selectedInfo.start), selectedEnd: formatMoment(selectedInfo.end)})
  }

  onModalClose = () => {
    this.setState({modalOpen: false, selectedStart: "", selectedEnd: "", isEdit: false, selectedCUID: ""})
  }

  getScheduleProps = ev => {
    const color = findByCUID(this.props.employees, ev.employeeCUID).scheduleColor
    return{style: {backgroundColor: color}, description: "Hello!"}
  }

  handleSelectSchedule = (schedule) => {
    this.props.onSelectEmployee({target: {value: schedule.employeeCUID}})
    this.setState({modalOpen: true, selectedStart: formatMoment(schedule.start), selectedEnd: formatMoment(schedule.end), selectedEmployee: schedule.selectedEmployee, isEdit: true, selectedCUID: schedule.cuid})
  }

  render(){
    const selectOptions = this.props.employees.map(employee => (<option value={employee.cuid} key={employee.cuid + "filter"}>{employee.name}</option>))
    const filteredSchedules = this.state.filteredEmployee === "" ? this.props.schedules : this.props.schedules.filter(sched => sched.employeeCUID === this.state.filteredEmployee)
    return(
      <div>
        <NewScheduleModal start={this.state.selectedStart} end={this.state.selectedEnd} onModalClose={this.onModalClose} modalOpen={this.state.modalOpen} selectedEmployee={this.props.selectedEmployee} onSelectEmployee={this.props.onSelectEmployee} isEdit={this.state.isEdit} cuid={this.state.selectedCUID} />
        <div>
          <select name="employees" multiple="" className="ui fluid dropdown" onChange={this.handleFilterChange}>
            <option value="">Filter By Employee</option>
            {selectOptions}
          </select>
        </div>
        <br />
        <BigCalendar
          selectable
          {...this.props}
          events={filteredSchedules}
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
