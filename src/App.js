import React, { Component } from 'react';
import './App.css';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import NewDateForm from './newDateObj'


BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));




class App extends Component {

  state = {
    events: [
      {
        'title': 'All Day Event very long title',
        // 'start': new Date(moment("20 05:06:07", "DD hh:mm:ss").format()),
        start: new Date('2017-11-21T00:00:00'),
        'end':  new Date("2017-11-21T12:00:00")
      }
    ]
  }

  onAddEvent = (newEvent) => {
    this.setState({
      events: this.state.events.concat([newEvent])
    })
  }

  render() {
    const moment = require('moment')
    const formats = {
      dateFormat: 'dd',

      dayFormat: (date, culture, localizer) =>
          localizer.format(date, 'DD', culture)
    }
    console.log(this.state.events);
    return (
      <div>
        <NewDateForm onAddEvent={this.onAddEvent}/>
        <br /><br /><br />
        <BigCalendar
        selectable
        {...this.props}
        events={this.state.events}
        formats={formats}
        timeslots={8}
        step={15}
        defaultView='week'
        defaultDate={new Date()}
        onSelectSlot={(slotInfo) => alert(
          `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
          `\nend: ${slotInfo.end.toLocaleString()}` +
          `\naction: ${slotInfo.action}`
        )}
         />
      </div>
    );
  }
}

export default App;
