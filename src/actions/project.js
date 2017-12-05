import api from '../services/apiRequests';


export function fetchProjects(){
  return function(dispatch){
    dispatch({type: "FETCHING_PROJECTS"})
    return api().project.fetch()
      .then(json => {
        const formatted = json.map(project => {
          return {
            name: project.name,
            id: project.id,
            subtype: project.subtype,
            clientID: project.client_id,
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
  return function(dispatch, getState){
    const pieceIDs = getState().pieces.list.filter(piece => project.id === piece.projectID).map(piece => piece.id)
    dispatch({type: "DESTROY_PROJECT", payload: {...project, pieceIDs}})
    return api().project.destroy(project)
  }
}

export function selectProject(project){
  return function(dispatch){
    dispatch({type: "SELECT_PROJECT", payload: {...project, projectID: project.id}}) //the extra ID is for the other reducers
  }
}
