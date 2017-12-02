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
            plannerID: operation.planner_id,
            procedureID: operation.procedure_id,
            employeeID: operation.employee_id,
            projectID: findByID(getState().procedures.list, operation.procedure_id).projectID
          }
        })
        dispatch({type: "FETCHED_OPERATIONS", payload: {operations, plannerID}})
      })
  }
}

export function createOperation(operation){
  return function(dispatch){

  }
}

export function patchOperation(operation){
  return function(dispatch){

  }
}
