export default function operationReducer(state = {
  list: {},
  fetchingOperations: false,
  didFetch: false,
  creatingOperation: false
}, action){ //plannerProjects array of projectIDs.
  switch(action.type){
    case "FETCHING_OPERATIONS":
      return {...state, fetchingOperations: true};

    case "FETCHED_OPERATIONS":
      if(state.didFetch){return state}
      const list = {...state.list}
      list[action.payload.plannerID] = action.payload.operations
      return {...state, list, fetchingOperations: false, didFetch: true};

    case "CREATING_OPERATION":
      return {...state, creatingOperation: true};

    case "CREATED_OPERATION":
      const newList = {...state.list}
      const newPlanner = [...newList[action.payload.plannerID], action.payload]
      newList[action.payload.plannerID] = newPlanner
      return {...state, creatingOperation: false, list: newList};

    case "PATCH_OPERATION":
      const updatedList = {...state.list}
      const updatedPlanner = [...updatedList[action.payload.plannerID].filter(operation => operation.id !== action.payload.id), action.payload]
      updatedList[action.payload.plannerID] = updatedPlanner
      return {...state, list: updatedList};

    case "LOG_OUT":
      return {...state, list: {}, didFetch: false};

    default:
      return state;
  }
}
