import api from '../services/apiRequests';
import { formatForPlanner } from '../helpers/momentHelper';


export function fetchPlannerProjects(week){
  console.log("here!");
  return function(dispatch){
    dispatch({type: "FETCHING_WEEK"})
    const monday = formatForPlanner(week)
    console.log(monday, "Monday");
    api().planner.fetchProjects(monday)
      .then(json => dispatch({type: "FETCHED_WEEK", payload: json}))
  }
}

export function fetchPlanners(){
  return function(dispatch){
    console.log("Fetching Planners");
    dispatch({type: "FETCHING_PLANNERS"})
    api().planner.fetch()
      .then(json => {
        const formatted = json.map(planner => {
          const name = `Mon: ${planner.monday.slice(5).replace('-','/')}  Fri: ${planner.friday.slice(5).replace('-','/')}`
          return {...planner, name }
        })
        dispatch({type: "FETCHED_PLANNERS", payload: formatted})
        fetchPlannerProjects(Date.now())(dispatch)
      })
  }
}

export function selectPlanner(planner){
  return function(dispatch){
    dispatch({type: "SELECT_PLANNER"})
  }
}
