export default function operationReducer(state = {
  list: [],
  fetchingOperations: false,
  didFetch: false
}, action){
  switch(action.type){
    case "FETCHING_OPERATIONS":
      return {...state, fetchingOperations: true};
    case "FETCHED_OPERATIONS":
      return {...state, list: action.payload, fetchingOperations: false, didFetch: true};
    default:
      return state;
  }
}
