import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import ScheduleModal from './ScheduleModal'
import { formatMoment } from '../../helpers/momentHelper'
import { findByCUID } from '../../helpers/generalHelpers'


BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

class Calendar extends Component{

  state = {
    modalOpen: false,
    selectedStart: "",
    selectedEnd: ""
  }

  handleSelect = (selectedInfo) => {
    this.setState({modalOpen: true, selectedStart: formatMoment(selectedInfo.start), selectedEnd: formatMoment(selectedInfo.end)})
  }

  onModalClose = () => {
    this.setState({modalOpen: false, selectedStart: "", selectedEnd: ""})
  }

  getScheduleProps = (ev) => {
    const color = findByCUID(this.props.employees, ev.employeeCUID).scheduleColor
    return{style: {backgroundColor: color}, title: "Hello!"}
  }

  render(){
    return(
      <div>
        <ScheduleModal start={this.state.selectedStart} end={this.state.selectedEnd} onModalClose={this.onModalClose} modalOpen={this.state.modalOpen}/>
        <BigCalendar
          selectable
          {...this.props}
          events={this.props.schedules}
          eventPropGetter={this.getScheduleProps}
          timeslots={6}
          step={15}
          defaultView='week'
          defaultDate={new Date()}
          onSelectEvent={schedule=>{console.log(schedule.title, schedule.description)}}

          onSelectSlot={(slotInfo) => {
            this.handleSelect(slotInfo)
          }}
        />
      </div>
    )
  }
}

export default Calendar;
