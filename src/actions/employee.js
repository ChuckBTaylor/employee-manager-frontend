import api from '../services/apiRequests';

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
    dispatch({type: "CREATE_EMPLOYEE", payload: employee})
    return api().employee.post(employee)
      .then(json => dispatch({type: "ADD_ID_TO_NEW_EMPLOYEE", payload: json.id}))
  }
}

export function patchEmployee(employee){
  return function(dispatch){
    dispatch({type: "PATCH_EMPLOYEE", payload: employee})
    return api().employee.patch(employee)
  }
}

export function destroyEmployee(employee){
  return function(dispatch){
    dispatch({type: "DESTROY_EMPLOYEE", payload: employee.id})
    return api().employee.destroy(employee)
  }
}

export function selectEmployee(employee){
  return function(dispatch){
    dispatch({type: "SELECT_EMPLOYEE", payload: employee})
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
