export default function operationReducer(state = {
  list: {},
  fetchingOperations: false,
  didFetch: false
}, action){ //plannerProjects array of projectIDs.
  switch(action.type){
    case "FETCHING_OPERATIONS":
      return {...state, fetchingOperations: true};

    case "FETCHED_OPERATIONS":
      const newList = {...state.list}
      newList[action.payload.plannerID] = action.payload.operations
      return {...state, list: newList, fetchingOperations: false, didFetch: true};

    default:
      return state;
  }
}
