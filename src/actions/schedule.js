import api from '../helpers/apiRequests'
import { findByID } from '../helpers/generalHelpers';
import { formatMoment } from '../helpers/momentHelper';


export function fetchSchedules(employeeList){
  return function(dispatch){
    dispatch({type: "FETCHING_SCHEDULES"})
    return api().schedule.fetch()
      .then(json => {
        const withCUID = json.map(sched => {
          const employee = findByID(employeeList, sched.employee_id)
          return{
            employeeCUID: employee.cuid,
            start: new Date(formatMoment(sched.scheduled_start)),
            end: new Date(formatMoment(sched.scheduled_end)),
            description: sched.description
          }
        })
        dispatch({type: "FETCHED_SCHEDULES", payload: withCUID})
      })
  }
}

export function createSchedule(schedule){
  return function(dispatch){
    dispatch({
      type: "CREATE_SCHEDULE",
      payload: schedule
    })
    api().schedule.postNew(schedule)
      .then(json => {
        console.log(json);
        dispatch({type: "ADD_ID_TO_NEW_SCHEDULE", payload: json.id})
      })
  }
}

export function someActionCreator(json){
  return {
    type: "SOME_ACTION",
    payload: json
  }
}


export function fetchSomething() {
  return function(dispatch) {
    fetch("SOME_URL")
      .then(res => res.json())
      .then(json => {
        dispatch(someActionCreator(json))
      })
  }
}
