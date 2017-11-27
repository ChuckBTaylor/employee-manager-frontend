import api from '../services/apiRequests';
import { findByID } from '../helpers/generalHelpers';


export function fetchPieces(projectList){
  return function(dispatch){
    dispatch({type: "FETCHING_PIECES"})
    return api().piece.fetch()
      .then(json => {
        const withProjectCUID = json.map(piece => {
          const project = findByID(projectList, piece.project_id)
          return {
            name: piece.name,
            id: piece.id,
            projectID: project.id,
            projectCUID: project.cuid
          }
        })
        console.log(withProjectCUID);
        dispatch({type: "FETCHED_PIECES", payload: withProjectCUID})
      })
  }
}

export function createPiece(piece){
  return function(dispatch){

  }
}

export function patchPiece(piece){
  return function(dispatch){

  }
}

export function destroyPiece(piece){
  return function(dispatch){

  }
}

export function selectPiece(piece){
  return({type: "SELECT_PIECE", payload: piece})
}
