import api from '../services/apiRequests';
import { formatMoment } from '../helpers/momentHelper';


export function fetchSchedules(){
  return function(dispatch){
    dispatch({type: "FETCHING_SCHEDULES"})
    return api().schedule.fetch()
      .then(json => {
        const formatted = json.map(sched => {
          return{
            employeeID: sched.employee_id,
            start: new Date(formatMoment(sched.scheduled_start)),
            end: new Date(formatMoment(sched.scheduled_end)),
            description: sched.description,
            id: sched.id
          }
        })
        dispatch({type: "FETCHED_SCHEDULES", payload: formatted})
      })
  }
}

export function createSchedule(schedule){
  return function(dispatch){
    dispatch({
      type: "CREATE_SCHEDULE",
      payload: schedule
    })
    return api().schedule.post(schedule)
      .then(json => {
        dispatch({type: "ADD_ID_TO_NEW_SCHEDULE", payload: json.id})
      })
  }
}

export function patchSchedule(schedule){
  return function(dispatch){
    api().schedule.patch(schedule)
    dispatch({
      type: "PATCH_SCHEDULE",
      payload: schedule
    })
  }
}

export function destroySchedule(schedule){
  return function(dispatch){
    api().schedule.destroy(schedule)
    dispatch({
      type: "DESTROY_SCHEDULE",
      payload: schedule.id
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
