import api from '../services/apiRequests';
import { findByID } from '../helpers/generalHelpers';


export function fetchProjects(clientList){
  return function(dispatch){
    dispatch({type: "FETCHING_PROJECTS"})
    api().project.fetch()
      .then(json => {
        const withClientCUID = json.map(project => {
          const client = findByID(clientList, project.client_id)
          return {
            name: project.name,
            id: project.id,
            subtype: project.subtype,
            clientID: client.id,
            clientCUID: client.cuid
          }
        })
        dispatch({type: "FETCHED_PROJECTS", payload: withClientCUID})
      })
  }
}

export function createProject(project){
  return function(dispatch){

  }
}

export function patchProject(project){
  return function(dispatch){

  }
}

export function destroyProject(project){
  return function(dispatch){

  }
}

export function selectProject(project){
  return({type: "SELECT_PROJECT", payload: project})
}
