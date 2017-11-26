import cuid from 'cuid';

export default function projectReducer(state = {
  list: [],
  clientProjects: [],
  selectedProject: {},
  fetchingProjects: false,
  didFetch: false
}, action){
  switch(action.type){

    case "FETCHING_PROJECTS":
      return state.didFetch ? state : {...state, fetchingProjects: true};

    case "FETCHED_PROJECTS":
      const withCUID = action.payload.map(project => ({...project, cuid: cuid()}))
      return {...state, list: withCUID, fetchingProjects: false, didFetch: true};

    case "CREATE_PROJECT":
      const createWithCUID = {...action.payload, cuid: cuid()}
      return {...state, list: [...state.list, createWithCUID]};

    case "ADD_ID_TO_NEW_PROJECT":
      if(!state.list[state.list.length - 1].id){
        const createdWithID = state.list[state.list.length - 1]
        createdWithID.id = action.payload
        return{...state, list: [...state.list.slice(0, -1), createdWithID]};
      }
      return state;

    case "PATCH_PROJECT":
      let index = -1
      const patchedProjects = state.list.map((project, idx) => {
        if(action.payload.cuid === project.cuid){
          index = idx
          return action.payload
        }
        return project
      })
      return {...state, list: patchedProjects, selectedProject: patchedProjects[index]};

    case "DESTROY_PROJECT":
      const filteredProjects = state.list.filter(project => project.cuid !== action.payload)
      return {...state, list: filteredProjects, selectedProject: {}};

    case "SELECT_CLIENT": //Yes, SELECT_CLIENT. When a new client is selected, the right projects are loaded
      const clientProjects = state.list.filter(project => project.clientCUID === action.payload.cuid)
      return {...state, clientProjects: clientProjects};

    case "SELECT_PROJECT":
      return {...state, selectedProject: action.payload};

    default:
      return state;
  }
}
