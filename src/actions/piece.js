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


function createProcedureFromPieces(procedure, piece, service){
  return{
    name: `${piece.name} - ${service.name}`,
    id: procedure.id,
    estimatedTime: service.defaultTime,
    complete: procedure.complete,
    pieceID: piece.id,
    serviceID: service.id,
    projectID: piece.projetID
  }
}

export function createPiece(piece){
  return function(dispatch, getState){
    dispatch({type: "CREATE_PIECE", payload: piece})
    const clientID = findByID(getState().projects.list, piece.projectID).clientID
    return api().piece.post({...piece, clientID})
      .then(json => {
        console.log(json);
        dispatch({type: "ADD_ID_TO_NEW_PIECE", payload: json.piece.id})

        json.procedures.forEach(procedure => {
          const service = findByID(getState().services.list, procedure.service_id)
          const formatted = createProcedureFromPieces(procedure, json.piece, service)
          dispatch({type: "CREATE_PROCEDURE", payload: formatted})
        })
      })
  }
}

export function patchPiece(piece){
  return function(dispatch, getState){
    dispatch({type: "PATCH_PIECE", payload: piece})
    console.log("from the action", piece);
    return api().piece.patch(piece)
      .then(json => {

        json.procedures.forEach(procedure => {
          const service = findByID(getState().services.list, procedure.service_id)
          const formatted = createProcedureFromPieces(procedure, piece, service)
          dispatch({type: "CREATE_PROCEDURE", payload: formatted})
        })
      })
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
