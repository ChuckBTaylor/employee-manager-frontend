export default function plannerReducer(state = {
list: [],
currentPlanner: -1,
fetchingPPs: false,
pps: {},
didFetch: false,
fetchingWeek: false,
creatingPlanner: false
}, action){ //state.projectsIDs = {plannerID: [projectID, projectID], plannerID: [projectID, projectID]}
  switch(action.type){
    case "FETCHING_WEEK":
      return {...state, fetchingWeek: true};

    case "FETCHED_WEEK":
      const alteredPlanners = state.list.map(planner => {
        if(planner.id === action.payload.plannerID){
          return {...planner, didFetchPPs: true};
        }
        return planner;
      })//Sets Planner in list to didFetchPPs
      const updatedPPIDs = {...state.pps}
      updatedPPIDs[action.payload.plannerID] = action.payload.pps
      return {...state, list: alteredPlanners, pps: updatedPPIDs, fetchingWeek: false, currentPlanner: action.payload.plannerID};

    case "FETCHING_PLANNERS":
      return state.didFetch ? state : {...state, fetchingPlanners: true}

    case "FETCHED_PLANNERS":
      if(state.didFetch){return state}
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

    case "ADD_PROCEDURE_TO_PLANNER":
      const plannerIDsObj = {...state.projectIDs}
      plannerIDsObj[state.currentPlanner] = [...plannerIDsObj[state.currentPlanner], action.payload]
      return {...state, projectIDs: plannerIDsObj};

    case "REMOVE_PROCEDURE_FROM_PLANNER":
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

    case "CREATED_OPERATION":
      const opPlanner = state.pps[state.currentPlanner]
      const newOpPP = opPlanner.find(pp => pp.id === action.payload.ppID)
      newOpPP.operations = [...newOpPP.operations, action.payload]
      const fixedOpPlanner = opPlanner.map(pp => {
        if(pp.id === action.payload.ppID){
          return newOpPP;
        }
        return pp;
      })

      return {...state, pps: {...state.pps, [state.currentPlanner]: fixedOpPlanner}};

    case "PATCH_OPERATION":
      const planner = state.pps[state.currentPlanner]
      const pp = planner.find(pp => pp.id === action.payload.ppID)

      const fixedOP = pp.operations.map(op => {
        if(op.id === action.payload.id){
          return action.payload;
        }
        return op;
      })
      const fixedPP = {...pp, operations: fixedOP}
      const fixedPlanner = planner.map(pp => {
        if(pp.id === action.payload.ppID){
          return fixedPP
        }
        return pp;
      })

      return ({...state, pps: {...state.pps, [state.currentPlanner] : fixedPlanner}});

    case "LOG_OUT":
      return {...state, list: [], currentPlanner: -1, didFetch: false, projectIDs: {}};

    default:
      return state;
  }
}
