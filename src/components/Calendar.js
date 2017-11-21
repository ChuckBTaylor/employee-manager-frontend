import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import ScheduleModal from './ScheduleModal'
import { formatMoment } from '../helpers/momentHelper'


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

  render(){
    return(
      <div>
        <ScheduleModal start={this.state.selectedStart} end={this.state.selectedEnd} onModalClose={this.onModalClose} modalOpen={this.state.modalOpen}/>
        <BigCalendar
          selectable
          {...this.props}
          events={this.props.events}
          timeslots={6}
          step={15}
          defaultView='week'
          defaultDate={new Date()}
          onSelectEvent={schedule=>{console.log(schedule.title)}}

          onSelectSlot={(slotInfo) => {
            this.handleSelect(slotInfo)
            // console.log(
            //   `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
            //   `\nend: ${slotInfo.end.toLocaleString()}` +
            //   `\naction: ${slotInfo.action}`
            // )
          }}
        />
      </div>
    )
  }
}

export default Calendar;
