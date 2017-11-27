export default function scheduleReducer(state = {
  list: [],
  fetchingSchedules: false,
  didFetch: false
}, action){
  switch(action.type){

    case "CREATE_SCHEDULE":
      const createWithID = {...action.payload}
      return {...state, list: [...state.list, createWithID]};

    case "FETCHING_SCHEDULES":
      return state.didFetch ? state : {...state, fetchingSchedules: true};

    case "FETCHED_SCHEDULES":
      if(state.didFetch){
        return state;
      }
      const withID = action.payload.map(schedule => ({...schedule}))
      return {...state, fetchingSchedules: false, list: withID, didFetch: true};

    case "PATCH_SCHEDULE":
      const patchedSchedules = state.list.filter(sched => sched.id !== action.payload.id)
      return {...state, list: [...patchedSchedules, action.payload]};

    case "DESTROY_SCHEDULE":
      const schedulesWithout = state.list.filter(sched => sched.id !== action.payload)
      return {...state, list: [...schedulesWithout]};

    case "ADD_ID_TO_NEW_SCHEDULE":
      if(!state.list[state.list.length - 1].id){
        const createdWithID = state.list[state.list.length - 1]
        createdWithID.id = action.payload
        return {...state, list: [...state.list.slice(0, -1), createdWithID]};
      }
      return state;

    case "DESTROY_EMPLOYEE":
      const sanitizedSchedules = state.list.filter(sched => sched.employeeID !== action.payload)
      return {...state, list: sanitizedSchedules}

    default:
      return state
  }
}
