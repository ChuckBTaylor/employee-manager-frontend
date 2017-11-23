import cuid from 'cuid';

export default function employeeReducer(state = {
  list: [],
  fetchingEmployees: false,
  didFetch: false
}, action){
  switch(action.type){

    case "CREATE_EMPLOYEE":
      const createWithCUID = {...action.payload, cuid: cuid()}
      return {...state, list: [...state.list, createWithCUID]};

    case "FETCHING_EMPLOYEES":
      return state.didFetch ? state : {...state, fetchingEmployees: true};

    case "FETCHED_EMPLOYEES":
      if(state.didFetch){
        return state}
      const withCUID = action.payload.map(employee => ({name: employee.name, scheduleColor: employee.schedule_color, id: employee.id, cuid: cuid()}))
      return {...state, fetchingEmployees: false, list: withCUID, didFetch: true};

    case "ADD_ID_TO_NEW_EMPLOYEE":
      if(!state.list[state.list.length - 1].id){
        const createdWithID = state.list[state.list.length - 1]
        createdWithID.id = action.payload
        return{...state, list: [...state.list.slice(0, -1), createdWithID]}
      }
      return state

    default:
      return state
  }
}
