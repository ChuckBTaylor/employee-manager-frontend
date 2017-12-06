import api from '../services/apiRequests';
import { findByID } from '../helpers/generalHelpers';
// import { findByID } from '../helpers/generalHelpers';

// export function fetchOperations(){
//   return function(dispatch, getState){
//     dispatch({type: "FETCHING_OPERATIONS"})
//     return api().operation.fetch()
//       .then(json => {
//         const formatted = json.map(operation => {
//           return{
//             id: operation.id,
//             name: operation.name,
//             employeeID: operation.employee_id,
//             procedureID: operation.procedure_id,
//             hours: operation.hours
//           }
//         })
//         dispatch({type: "FETCHED_OPERATIONS", payload: formatted})
//       })
//   }
// }

export function fetchPlannerOperations(plannerID){
  return function(dispatch, getState){
    dispatch({type: "FETCHING_OPERATONS"})
    api().operation.fetchWeek(plannerID)
      .then(json => {
        const operations = json.map(operation => {
          return {
            name: operation.name,
            id: operation.id,
            hours: operation.hours,
            ppID: operation.planners_procedure_id,
            employeeID: operation.employee_id
          }
        })
        dispatch({type: "FETCHED_OPERATIONS", payload: {operations, plannerID}})
      })
  }
}

export function createOperation(newOperation){
  return function(dispatch, getState){
    console.log(newOperation);
    dispatch({type: "CREATING_OPERATION"})
    api().operation.post(newOperation)
      .then(json => {
        const payload = {
          name: json.name,
          id: json.id,
          hours: json.hours,
          ppID: json.planners_procedure_id,
          employeeID: json.employee_id
        }
        dispatch({type: "CREATED_OPERATION", payload })
      })
  }
}

export function patchOperation(operation){
  return function(dispatch){
    dispatch({type: "PATCH_OPERATION", payload: operation})
    api().operation.patch(operation)
  }
}
