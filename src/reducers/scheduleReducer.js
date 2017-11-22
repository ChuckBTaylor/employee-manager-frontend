import cuid from 'cuid'

export default function scheduleReducer(state = {
  list: [],
  fetchingSchedules: false,
  didFetch: false
}, action){
  switch(action.type){

    case "CREATE_SCHEDULE":
      const createWithCUID = {...action.payload, cuid: cuid()}
      return {...state, list: [...state.list, createWithCUID]};

    case "FETCHING_SCHEDULES":
      return state.didFetch ? state : {...state, fetchingSchedules: true};

    case "FETCHED_SCHEDULES":
      if(state.didFetch){
        return state;
      }
      const withCUID = action.payload.map(schedule => ({...schedule, cuid: cuid()}))
      return {...state, fetchingSchedules: false, list: withCUID, didFetch: true};

    case "ADD_ID_TO_NEW_SCHEDULE":
      if(!state.list[state.list.length - 1].id){
        const createdWithID = state.list[state.list.length - 1]
        createdWithID.id = action.payload
        return {...state, list: [...state.list.slice(0, -1), createdWithID]}
      }
      return state
    default:
      return state
  }
}
