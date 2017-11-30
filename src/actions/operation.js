import api from '../services/apiRequests';
import { findByID } from '../helpers/generalHelpers';

export function fetchOperations(){
  return function(dispatch, getState){
    dispatch({type: "FETCHING_OPERATIONS"})
    return api().operation.fetch()
      .then(json => {
        console.log(json);
        const formatted = json.map(operation => {
          return{
            id: operation.id,
            employeeID: operation.employee_id,
            procedureID: operation.procedure_id,
            hours: operation.hours
          }
        })
        dispatch({type: "FETCHED_OPERATIONS", payload: formatted})
      })
  }
}
