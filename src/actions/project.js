import api from '../services/apiRequests';
import { findByID } from '../helpers/generalHelpers';


export function fetchProjects(){
  return function(dispatch, getState){
    dispatch({type: "FETCHING_PROJECTS"})
    return api().project.fetch()
      .then(json => {
        const formatted = json.map(project => {
          const client = findByID(getState().clients.list, project.client_id)
          return {
            name: project.name,
            id: project.id,
            subtype: project.subtype,
            clientID: client.id,
            complete: project.complete
          }
        })
        dispatch({type: "FETCHED_PROJECTS", payload: formatted})
      })
  }
}

export function createProject(project){
  return function(dispatch){
    dispatch({type: "CREATE_PROJECT", payload: project})
    return api().project.post(project)
      .then(json => dispatch({type: "ADD_ID_TO_NEW_PROJECT", payload: json.id}))
  }
}

export function patchProject(project){
  return function(dispatch){
    dispatch({type: "PATCH_PROJECT", payload: project})
    api().project.patch(project)
  }
}

export function destroyProject(project){
  return function(dispatch){
    dispatch({type: "DESTROY_PROJECT", payload: project})
    return api().project.destroy(project)
  }
}

export function selectProject(project){
  return function(dispatch){
    dispatch({type: "SELECT_PROJECT", payload: {...project, projectID: project.id}}) //the extra ID is for the other reducers
  }
}
