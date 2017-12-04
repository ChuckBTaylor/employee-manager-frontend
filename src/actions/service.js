import api from '../services/apiRequests'

export function fetchServices(){
  return function(dispatch){
    dispatch({type: "FETCHING_SERVICES"})
    return api().service.fetch()
      .then(json => {
        console.log('services json', json);
        dispatch({type: "FETCHED_SERVICES", payload: json})
      })
  }
}

export function createService(service){
  return function(dispatch){
    dispatch({type:"CREATE_SERVICE", payload: service})
    return api().service.post(service)
      .then(json => dispatch({type: "ADD_ID_TO_NEW_SERVICE", payload: json.id}))
  }
}

export function patchService(service){
  return function(dispatch){
    dispatch({type: "PATCH_SERVICE", payload: service})
    return api().service.patch(service)
  }
}

export function destroyService(service){
  return function(dispatch){
    dispatch({type: "DESTROY_SERVICE", payload: service.id})
    return api().service.destroy(service)
  }
}

export function selectService(service){
  return {
    type: "SELECT_SERVICE",
    payload: service
  }
}
