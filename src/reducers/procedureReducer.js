export default function procedureReducer(state = {
  list: [],
  projectProcedures: [],
  selectedProcedure: {},
  fetchingProcedures: false,
  didFetch: false
}, action){
  switch(action.type){

    case "FETCHING_PROCEDURES":
      return state.didFetch ? state : {...state, fetchingProcedures: true};

    case "FETCHED_PROCEDURES":
      const list = action.payload.map(procedure => ({...procedure}))
      return {...state, list, fetchingProcedures: false, didFetch: true};

    case "CREATE_PROCEDURE":
      const created = {...action.payload}
      return {...state, list: [...state.list, created]};

    case "ADD_ID_TO_NEW_PROCEDURE":
      if(!state.list[state.list.length - 1].id){
        const createdWithID = state.list[state.list.length - 1]
        createdWithID.id = action.payload
        return{...state, list: [...state.list.slice(0, -1), createdWithID]};
      }
      return state;

    case "PATCH_PROCEDURE":
      let index = -1
      const patchedProcedures = state.list.map((procedure, idx) => {
        if(action.payload.id === procedure.id){
          index = idx
          return action.payload
        }
        return procedure
      })
      return {...state, list: patchedProcedures, selectedProcedure: patchedProcedures[index]};

    case "DESTROY_CLIENT":
      const clientSanitizedProcedures = state.list.filter(procedure => action.payload.projectIDs.includes(procedure.projectID))
      return {...state, list: clientSanitizedProcedures};

    case "DESTROY_PROJECT":
      const sanitizedProcedures = state.list.filter(procedure => procedure.projectID !== action.payload.id)
      return {...state, list: sanitizedProcedures}

    case "DESTROY_PROCEDURE":
      const filteredProcedures = state.list.filter(procedure => procedure.id !== action.payload)
      return {...state, list: filteredProcedures, selectedProcedure: {}};

    case(!!action.type.match("SELECT") ? action.type : null):
      const projectProcedures = state.list.filter(procedure => procedure.projectID === action.payload.projectID)
      switch(action.type){
        case "SELECT_PROJECT": //Yes, SELECT_PROJECT. A new project is selected, the right procedures are loaded
        return state;

        case "SELECT_PROCEDURE":
        return {...state, selectedProcedure: action.payload, projectProcedures};

        default:
          return state;
      }

    default:
      return state;
  }
}
