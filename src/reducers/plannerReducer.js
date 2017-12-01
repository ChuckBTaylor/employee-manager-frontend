export default function plannerReducer(state = {
list: [],
projectIDs: [],
currentPlanner: {},
fetchingPlanners: false,
didFetch: false,
fetchingWeek: false
}, action){
  switch(action.type){
    case "FETCHING_WEEK":
      return {...state, fetchingWeek: true};

    case "FETCHED_WEEK":
      return {...state, projectIDs: action.payload, fetchingWeek: false};

    case "FETCHING_PLANNERS":
      return {...state, fetchingPlanners: true}

    case "FETCHED_PLANNERS":
      return {...state, list: action.payload};

    case "SELECT_PLANNER":
      return {...state, currentPlanner: action.payload};

    case "ADD_PROJECT_TO_PLANNER":
      return {...state, projectIDs: [...state.projectIDs, action.payload] };

    default:
      return state;
  }
}
