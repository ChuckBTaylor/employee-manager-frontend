import api from '../services/apiRequests';


export function fetchPPs(week){ //week == plannerID
  return function(dispatch){
    dispatch({type: "FETCHING_WEEK"})
    api().planner.fetchPPs(week)
      .then(json => {
        const formattedOperations = json.operations.map(operation => ({
          employeeID: operation.employee_id,
          id: operation.id,
          hours: operation.hours,
          name: operation.name,
          ppID: operation.planners_procedure_id
        }))
        const formattedPPs = json.pps.map(pp => ({
          allottedTime: pp.allotted_time,
          id: pp.id,
          procedureID: pp.procedure_id,
          pieceID: pp.piece_id,
          projectID: pp.project_id,
          operations: formattedOperations.filter(operation => operation.ppID === pp.id)
        }))
        const payload = {plannerID: json.planner_id, pps: formattedPPs}
        return dispatch({type: "FETCHED_WEEK", payload})
      })
  }
}

function formatMondayFriday(planner){
  return `Mon: ${planner.monday.slice(5).replace('-','/')}  Fri: ${planner.friday.slice(5).replace('-','/')}`
}

export function fetchPlanners(){
  return function(dispatch, getState){
    dispatch({type: "FETCHING_PLANNERS"})
    api().planner.fetch()
      .then(json => {
        const payload = json.map(planner => {
          const name = formatMondayFriday(planner)
          const formatted  = {name, allottedTime: planner.allotted_time, didFetchPPs: false, id: planner.id}
          return formatted;
        })
        dispatch({type: "FETCHED_PLANNERS", payload})
        fetchPPs(payload[payload.length - 1].id)(dispatch)
      })
  }
}

export function createPlanner(){
  return function(dispatch){
    dispatch({type: "CREATING_PLANNER"})
    api().planner.post()
      .then(json => {
        const payload = {name: formatMondayFriday(json), didFetchWeek: true, id: json.id, allottedTime: json.allotted_time}
        dispatch({type: "CREATED_PLANNER", payload})
      })
  }
}

export function addToWeeklyPlanner(procedureID, plannerID){
  return function(dispatch){
    api().pp.post(procedureID, plannerID)
      .then(json => {
        const payload = {
          allottedTime: json.allotted_time,
          id: json.id,
          procedureID: json.procedure_id,
          pieceID: json.piece_id,
          projectID: json.project_id,
          operations: []
        }
        dispatch({type: "ADD_PP_TO_PLANNER", payload})
      })

  }
}

export function selectPlanner(planner){ //plannerID
  return function(dispatch){
    dispatch({type: "SELECT_PLANNER", payload: planner})
  }
}

export function removeFromWeeklyPlanner(ppID){
  return function(dispatch){
    dispatch({type: "REMOVE_PP_FROM_PLANNER", payload: ppID})
    api().pp.destroy(ppID)
      .then(json => console.log(json))
  }
}

export function patchPlanner(planner){
  return function(dispatch){
    dispatch({type: "PATCH_PLANNER", payload: planner})
    api().planner.patch(planner)
      .then(json => console.log(json))
  }
}

export function patchPP(pp){
  return function(dispatch){
    dispatch({type: "PATCH_PP", payload: pp})
    api().pp.patch(pp)
  }
}
