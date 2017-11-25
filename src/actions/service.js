import api from '../services/apiRequests'

export function fetchServices(){
  return function(dispatch){
    dispatch({type: "FETCHING_PRODUCTS"})
    api().service.fetch()
      .then(json => dispatch({type: "FETCHED_PRODUCTS", payload: json}))
  }
}

export function createService(service){
  return function(dispatch){
    dispatch({type:"CREATE_PRODUCT", payload: service})
    api().service.post(service)
      .then(json => dispatch({type: "ADD_ID_TO_NEW_PRODUCT", payload: json.id}))
  }
}

export function patchService(service){
  return function(dispatch){
    api().service.patch(service)
    dispatch({type: "PATCH_PRODUCT", payload: service})
  }
}

export function destroyService(service){
  return function(dispatch){
    api().service.destroy(service)
    dispatch({type: "DESTROY_PRODUCT", payload: service.cuid})
  }
}

export function selectService(service){
  return {
    type: "SELECT_PRODUCT",
    payload: service
  }
}
