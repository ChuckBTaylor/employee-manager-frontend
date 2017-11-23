import api from '../helpers/apiRequests'

export function fetchEmployees(){
  return function(dispatch){
    dispatch({type: "FETCHING_EMPLOYEES"})
    return api().employee.fetch()
      .then(json => {
        dispatch({type: "FETCHED_EMPLOYEES", payload: json})
      })
  }
}



export function createEmployee(employee){
  return function(dispatch){
    dispatch({
      type: "CREATE_EMPLOYEE",
      payload: employee
    })
    api().employee.postNew(employee)
      .then(json => {
        console.log(json)
        dispatch({type: "ADD_ID_TO_NEW_EMPLOYEE", payload: json.id})
      })

  }
}


export function someActionCreator(json){
  return {
    type: "SOME_ACTION",
    payload: json
  }
}


export function fetchSomething(){
  return function(dispatch) {
    dispatch({type: "FETCHING_EMPLOYEES"})
    fetch("SOME_URL")
      .then(res => res.json())
      .then(json => {
        dispatch(someActionCreator(json))
      })
  }
}
