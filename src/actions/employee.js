import api from '../services/apiRequests'

export function fetchEmployees(){
  return function(dispatch){
    console.log("fetching employees");
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
    api().employee.post(employee)
      .then(json => {
        dispatch({type: "ADD_ID_TO_NEW_EMPLOYEE", payload: json.id})
      })

  }
}

export function patchEmployee(employee){
  return function(dispatch){
    api().employee.patch(employee)
    dispatch({
      type: "PATCH_EMPLOYEE",
      payload: employee
    })
  }
}

export function destroyEmployee(employee){
  return function(dispatch){
    api().employee.destroy(employee)
    dispatch({
      type: "DESTROY_EMPLOYEE",
      payload: employee.id
    })
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
