import api from '../services/apiRequests';
import { findByID } from '../helpers/generalHelpers';


export function fetchPieces(){
  return function(dispatch){
    dispatch({type: "FETCHING_PIECES"})
    return api().piece.fetch()
      .then(json => {
        const formatted = json.map(piece => {
          return {
            name: piece.name,
            id: piece.id,
            projectID: piece.project_id,
            complete: piece.complete
          }
        })
        dispatch({type: "FETCHED_PIECES", payload: formatted})
      })
  }
}

export function createPiece(piece){
  return function(dispatch, getState){
    dispatch({type: "CREATE_PIECE", payload: piece})
    const clientID = findByID(getState().projects.list, piece.projectID).clientID
    return api().piece.post({...piece, clientID})
      .then(json => {
        dispatch({type: "ADD_ID_TO_NEW_PIECE", payload: json.piece.id})

        json.procedures.forEach(procedure => {
          const formatted = {
            id: procedure.id,
            serviceID: procedure.service_id,
            pieceID: procedure.piece_id,
            estimatedTime: procedure.estimated_time,
            complete: procedure.complete,
            projectID: piece.projectID
          }
          dispatch({type: "CREATE_PROCEDURE", payload: formatted})
        })
      })
  }
}

export function patchPiece(piece){
  return function(dispatch, getState){
    debugger
    dispatch({type: "PATCH_PIECE", payload: piece})
    const clientID = findByID(getState().projects.list, piece.projectID).clientID
    return api().piece.patch({...piece, clientID})
  }
}

export function destroyPiece(piece){
  return function(dispatch, getState){
    dispatch({type: "DESTROY_PIECE", payload: piece})
    const clientID = findByID(getState().projects.list, piece.projectID).clientID
    return api().piece.destroy({...piece, clientID})
  }
}

export function selectPiece(piece){
  return function(dispatch, getState){
    const clientID = findByID(getState().projects.list, piece.projectID).clientID
    dispatch({type: "SELECT_PIECE", payload: {...piece, clientID }})
  }
}
