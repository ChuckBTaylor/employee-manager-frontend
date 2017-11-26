import api from '../services/apiRequests'

export function fetchClients(){
  return function(dispatch){
    dispatch({type: "FETCHING_CLIENTS"})
    return api().client.fetch()
      .then(json => dispatch({type: "FETCHED_CLIENTS", payload: json}))
  }
}

export function createClient(client){
  return function(dispatch){
    dispatch({type: "CREATE_CLIENT", payload: client})
    api().client.post(client)
      .then(json => dispatch({type: "ADD_ID_TO_NEW_CLIENT", payload: json.id}))
  }
}

export function patchClient(client){
  return function(dispatch){
    api().client.patch(client)
    dispatch({type: "PATCH_CLIENT", payload: client})
  }
}

export function destroyClient(client){
  return function(dispatch){
    api().client.destroy(client)
    dispatch({type: "DESTROY_CLIENT", payload: client.cuid})
  }
}

export function selectClient(client){
  return {
    type: "SELECT_CLIENT",
    payload: client
  }
}
