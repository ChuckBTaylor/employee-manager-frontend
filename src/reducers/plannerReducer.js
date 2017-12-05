export default function plannerReducer(state = {
list: [],
projectIDs: {},
currentPlanner: -1,
fetchingPlanners: false,
didFetch: false,
fetchingWeek: false,
creatingPlanner: false
}, action){ //state.projectsIDs = {plannerID: [projectID, projectID], plannerID: [projectID, projectID]}
  switch(action.type){
    case "FETCHING_WEEK":
      return {...state, fetchingWeek: true};

    case "FETCHED_WEEK":
      if(state.didFetch){return state}
      const alteredPlanners = state.list.map(planner => {
        if(planner.id === action.payload.plannerID){
          return {...planner, didFetchWeek: true};
        }
        return planner;
      })
      const updatedProjectIDs = {...state.projectIDs}
      updatedProjectIDs[action.payload.plannerID] = action.payload.projectIDs
      return {...state, list: alteredPlanners, projectIDs: updatedProjectIDs, fetchingWeek: false, currentPlanner: action.payload.plannerID};

    case "FETCHING_PLANNERS":
      return {...state, fetchingPlanners: true}

    case "FETCHED_PLANNERS":
      return {...state, list: action.payload};

    case "CREATING_PLANNER":
      return {...state, creatingPlanner: true};

    case "CREATED_PLANNER":
      const postList = [...state.list, action.payload]
      const postProjectIDs = {...state.projectIDs}
      postProjectIDs[action.payload.id] = []
      return {...state, creatingPlanner: false, list: postList, projectIDs: postProjectIDs, currentPlanner: action.payload.id }

    case "SELECT_PLANNER":
      return {...state, currentPlanner: action.payload};

    case "ADD_PROJECT_TO_PLANNER":
      const plannerIDsObj = {...state.projectIDs}
      plannerIDsObj[state.currentPlanner] = [...plannerIDsObj[state.currentPlanner], action.payload]
      return {...state, projectIDs: plannerIDsObj};

    case "REMOVE_PROJECT_FROM_PLANNER":
      const plannerIDsObject = {...state.projectIDs}
        const sanitizedIDs = [...plannerIDsObject[state.currentPlanner]].filter(projectID => projectID !== action.payload)
      plannerIDsObject[state.currentPlanner] = sanitizedIDs //Receives new array of projectIDs
      return {...state, projectIDs: plannerIDsObject}

    case "PATCH_PLANNER":
    console.log(action.payload);
      const updatedList = state.list.map(planner => {
        if(planner.id === action.payload.id){
          return action.payload
        }
        return planner
      })
      console.log(updatedList);
      return {...state, list: updatedList};

    case "LOG_OUT":
      return {...state, list: [], currentPlanner: -1, didFetch: false, projectIDs: {}};

    default:
      return state;
  }
}
