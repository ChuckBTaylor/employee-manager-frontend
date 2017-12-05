import api from '../services/apiRequests';
import { findByID } from '../helpers/generalHelpers';


export function fetchProcedures(){
  return function(dispatch, getState){
    dispatch({type: "FETCHING_PROCEDURES"})
    return api().procedure.fetch()
      .then(json => {
        console.log(json);
        const formatted = json.map(procedure => {
          const service = findByID(getState().services.list, procedure.service_id)
          const piece = findByID(getState().pieces.list, procedure.piece_id)

          return {
            name: `${piece ? piece.name : "ERROR"} - ${service.name}`,
            id: procedure.id,
            complete: procedure.complete,
            pieceID: procedure.piece_id,
            serviceID: procedure.service_id,
            projectID: piece ? piece.projectID : -1,
            estimatedTime: procedure.estimated_time
          }
        })
        dispatch({type: "FETCHED_PROCEDURES", payload: formatted})
      })
  }
}


export function patchProcedure(procedure){
  return function(dispatch){
    dispatch({type: "PATCH_PROCEDURE", payload: procedure})
    return api().procedure.patch(procedure)
  }
}
