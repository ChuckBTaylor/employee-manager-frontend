import api from '../helpers/apiRequests'

export function fetchEmployees() {
  return function(dispatch){
    // console.log("Fetching Employees");
    dispatch({type: "FETCHING_EMPLOYEES"})
    api().fetchEmployees()
      .then(json => {
        dispatch({type: "FETCHED_EMPLOYEES", payload: json})
      })
  }
}


export function someActionCreator(json){
  return {
    type: "SOME_ACTION",
    payload: json
  }
}


export function fetchSomething() {
  return function(dispatch) {
    dispatch({type: "FETCHING_EMPLOYEES"})
    fetch("SOME_URL")
      .then(res => res.json())
      .then(json => {
        dispatch(someActionCreator(json))
      })
  }
}
