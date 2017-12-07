import api from '../services/apiRequests'

export function fetchClients(){
  return function(dispatch){
    dispatch({type: "FETCHING_CLIENTS"})
    return api().client.fetch()
      .then(json => {
        dispatch({type: "FETCHED_CLIENTS", payload: json})
      })
  }
}

export function createClient(client){
  return function(dispatch){
    dispatch({type: "CREATE_CLIENT", payload: client})
    return api().client.post(client)
      .then(json => dispatch({type: "ADD_ID_TO_NEW_CLIENT", payload: json.id}))
  }
}

export function patchClient(client){
  return function(dispatch){
    dispatch({type: "PATCH_CLIENT", payload: client})
    return api().client.patch(client)
  }
}

export function destroyClient(client){
  return function(dispatch, getState){
    const projectIDs = getState().projects.list.filter(project => project.clientID === client.id).map(project => project.id)
    const pieceIDs = getState().pieces.list.filter(piece => projectIDs.includes(piece.projectID)).map(piece => piece.id)
    dispatch({type: "DESTROY_CLIENT", payload: {...client, projectIDs, pieceIDs}})
    return api().client.destroy(client)
  }
}

export function selectClient(client){
  return {
    type: "SELECT_CLIENT",
    payload: {...client, clientID: client.id} //The extra clientID for the other reducers
  }
}
