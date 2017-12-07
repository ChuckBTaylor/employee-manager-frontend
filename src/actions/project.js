import api from '../services/apiRequests';


export function fetchProjects(){
  return function(dispatch){
    dispatch({type: "FETCHING_PROJECTS"})
    return api().project.fetch()
      .then(json => {
        console.log(json, 'projects');
        const formatted = json.map(project => {
          return {
            name: project.name,
            id: project.id,
            subtype: project.subtype,
            clientID: project.client_id,
            complete: project.complete,
            totalWorked: project.total_worked
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

export function fetchProjectData(projectID){
  return function(dispatch){
    dispatch({type: "FETCHING_PROJECT_DATA"})
    api().project.show(projectID)
      .then(json => {
        console.log(json);
        const pieces = json.procedure_sheet.pieces.map(piece => (
          {
            id: piece.id,
            name: piece.name,
            projectID: piece.project_id,
            totalWorked: piece.total_worked
          }
        ))
        const procedures = json.procedure_sheet.procedures.map(proc => (
          {
            id: proc.id,
            pieceID: proc.piece_id,
            totalWorked: proc.total_worked,
            bidTime: proc.estimated_time,
            serviceName: proc.service_name
          }
        ))
        const procedureSheet = {pieces, procedures}
        dispatch({type: "FETCHED_PROJECT_DATA", payload: {totalEst: json.total_est, totalWorked: json.total_worked, procedureSheet}})
      })
  }
}

export function clearProjectData(){
  return {type: "RESET_PROJECT_DATA"};
}
