import React, { Component } from 'react';
import { connect } from 'react-redux'
import Calendar from '../components/Calendar';
import NewScheduleForm from '../components/NewScheduleForm';
import { bindActionCreators } from 'redux';
import { addSchedule } from '../actions/schedule'


class ScheduleContainer extends Component{

  onAddSchedule = (newSchedule) => {
    this.props.addSchedule(newSchedule)
  }

  render(){
    return(
      <div>
        <NewScheduleForm onAddSchedule={this.onAddSchedule} />
        <br /><br /><br />
        <Calendar onAddSchedule={this.onAddSchedule} events={this.props.schedules}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    schedules: state.schedules.list
  }
}

export default connect(mapStateToProps)(ScheduleContainer);
