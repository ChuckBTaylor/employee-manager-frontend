export default function operationReducer(state = {
  list: [],
  plannerProjects: [],
  fetchingOperations: false,
  didFetch: false
}, action){ //plannerProjects array of projectIDs.
  switch(action.type){
    case "FETCHING_OPERATIONS":
      return {...state, fetchingOperations: true};

    case "FETCHED_OPERATIONS":
      return {...state, list: action.payload, fetchingOperations: false, didFetch: true};

    case "ADD_PROJECT_TO_PLANNER":
      return {...state, plannerProjects: [...state.plannerProjects, action.payload]};

    default:
      return state;
  }
}
