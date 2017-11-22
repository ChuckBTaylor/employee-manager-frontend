import cuid from 'cuid'

export default function scheduleReducer(state = {
  list: [],
  fetchingSchedules: false,
  didFetch: false
}, action){
  switch(action.type){
    case "ADD_SCHEDULE":
      const newWithCUID = {...action.payload, cuid: cuid()}
      return {...state, list: [...state.list, newWithCUID]};
    case "FETCHING_SCHEDULES":
      return state.didFetch ? state : {...state, fetchingSchedules: true};
    case "FETCHED_SCHEDULES":
      if(state.didFetch){
        return state
      }
      const withCUID = action.payload.map(schedule => ({...schedule, cuid: cuid()}))
      return {...state, fetchingSchedules: false, list: withCUID, didFetch: true};
    default:
      return state
  }
}
