export default function plannerReducer(state = {
list: [],
currentPlanner: -1,
fetchingPPs: false,
pps: {},
didFetch: false,
fetchingWeek: false,
creatingPlanner: false,
creatingOperation: false
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
      const newPPs = {...state.pps, [action.payload.id]: []}
      return {...state, creatingPlanner: false, list: postList, pps: newPPs, currentPlanner: action.payload.id }

    case "SELECT_PLANNER":
      return {...state, currentPlanner: action.payload};

    case "ADD_PP_TO_PLANNER":
      // const oldPla = state.pps[state.currentPlanner]
      //Fix this to check for already existing ops in case of quick user input
      const pla = [...state.pps[state.currentPlanner], action.payload]
      return {...state, pps: {...state.pps, [state.currentPlanner]: pla}};

    case "REMOVE_PP_FROM_PLANNER":
      const pl = [...state.pps[state.currentPlanner].filter(pp => pp.id !== action.payload)]
      return {...state, pps: {...state.pps, [state.currentPlanner]: pl}}

    case "PATCH_PLANNER":
      const updatedList = state.list.map(planner => {
        if(planner.id === action.payload.id){
          return action.payload
        }
        return planner
      })
      return {...state, list: updatedList};

    case "PATCH_PP":
      const plannerToUpdate = state.pps[state.currentPlanner].map(pp => {
        if(pp.id === action.payload.id){
          return action.payload;
        }
        return pp;
      })

      return {...state, pps: {...state.pps, [state.currentPlanner]: plannerToUpdate}};

    case "CREATING_OPERATION":
      return {...state, creatingOperation: true};

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

      return {...state, pps: {...state.pps, [state.currentPlanner]: fixedOpPlanner}, creatingOperation: false};
      
    case "FAILED_OPERATION_CREATE":
      alert("Type slower!")
      return {...state, creatingOperation: false};

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
      return {...state, list: [], currentPlanner: -1, didFetch: false, pps: {}};

    default:
      return state;
  }
}
