import cuid from 'cuid';

export default function employeeReducer(state = {
  list: [],
  fetchingEmployees: false,
  didFetch: false
}, action) {
  switch(action.type){
    case "FETCHING_EMPLOYEES":
      return state.didFetch ? state : {...state, fetchingEmployees: true};
    case "FETCHED_EMPLOYEES":
      if(state.didFetch){
        return state}
      const withCUID = action.payload.map(employee => ({name: employee.name, scheduleColor: employee.schedule_color, id: employee.id, cuid: cuid()}))
      return {...state, fetchingEmployees: false, list: withCUID, didFetch: true};
    default:
      return state
  }
}
