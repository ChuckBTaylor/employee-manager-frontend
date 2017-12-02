import api from '../services/apiRequests';
import { formatForPlanner } from '../helpers/momentHelper';
import { fetchPlannerOperations } from './operation';


export function fetchPlannerProjects(week){ //week == plannerID
  return function(dispatch){
    dispatch({type: "FETCHING_WEEK"})
    api().planner.fetchProjects(week)
      .then(json => { //{planner_id: -1, project_ids: [-1,-2]}
        const payload = {plannerID: json.planner_id, projectIDs: json.project_ids}
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
          const formatted  = {name, allottedTime: planner.allotted_time, didFetchWeek: false, id: planner.id}
          return formatted;
        })
        dispatch({type: "FETCHED_PLANNERS", payload})
        fetchPlannerProjects(payload[payload.length - 1].id)(dispatch) //Fetches current week planner
        fetchPlannerOperations(payload[payload.length - 1].id)(dispatch, getState) //Fetches Operations for week
      })
  }
}

export function createPlanner(){
  return function(dispatch){
    dispatch({type: "CREATING_PLANNER"})
    api().planner.post()
      .then(json => {
        console.log(json);
        const payload = {name: formatMondayFriday(json), didFetchWeek: true, id: json.id}
        dispatch({type: "CREATED_PLANNER", payload})
      })
  }
}

export function addToWeeklyPlanner(projectID, plannerID){
  return function(dispatch){
    dispatch({type: "ADD_PROJECT_TO_PLANNER", payload: projectID})
    api().planner.addToPlanner(projectID, plannerID)
      .then(json => console.log(json))
  }
}

export function selectPlanner(planner){ //plannerID
  return function(dispatch){
    dispatch({type: "SELECT_PLANNER", payload: planner})
  }
}

export function removeFromWeeklyPlanner(projectID, plannerID){
  return function(dispatch){
    dispatch({type: "REMOVE_PROJECT_FROM_PLANNER", payload: projectID})
    api().planner.removeFromPlanner(projectID, plannerID)
      .then(json => console.log(json))
  }
}
