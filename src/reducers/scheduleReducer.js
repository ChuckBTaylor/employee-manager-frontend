import cuid from 'cuid'

export default function scheduleReducer(state = {
  list: [],
  fetchingSchedules: false
}, action){
  switch(action.type){
    case "ADD_SCHEDULE":
      return {...state, list: [...state.list, action.payload]}
    default:
      return state
  }
}
