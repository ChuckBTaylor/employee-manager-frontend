import { findByID } from '../helpers/generalHelpers';
import clientReducer from './clientReducer'

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
      const withID = action.payload.map(project => ({...project}))
      return {...state, list: withID, fetchingProjects: false, didFetch: true};

    case "CREATE_PROJECT":
      const createWithID = {...action.payload}
      return {...state, list: [...state.list, createWithID]};

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
        if(action.payload.id === project.id){
          index = idx
          return action.payload
        }
        return project
      })
      return {...state, list: patchedProjects, selectedProject: patchedProjects[index]};

    case "DESTROY_PROJECT":
      const filteredProjects = state.list.filter(project => project.id !== action.payload)
      return {...state, list: filteredProjects, selectedProject: {}};

    case (!!action.type.match("SELECT") ? action.type : null):
      const clientProjects = state.list.filter(project => project.clientID === action.payload.clientID)
      switch(action.type){
        case "SELECT_CLIENT":
          return {...state, clientProjects};

        case "SELECT_PROJECT":
          return {...state, selectedProject: action.payload, clientProjects};

        case "SELECT_PIECE":
          const cProjects = state.list.filter(project => project.clientID === action.payload.id)
          return {...state, selectedProject: findByID(state.list, action.payload.projectID), clientProjects};

        default:
          return state;
      }

    default:
      return state;
  }
}
