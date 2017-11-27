import { findByID } from '../helpers/generalHelpers'

export default function clientReducer(state = {
  list: [],
  selectedClient: {},
  fetchingClients: false,
  didFetch: false
}, action){
  switch(action.type){

    case "FETCHING_CLIENTS":
      return state.didFetch ? state : {...state, fetchingClients: true};

    case "FETCHED_CLIENTS":
      if(state.didFetch){
        return state;
      }
      const withID = action.payload.map(client => ({name: client.name, id: client.id}))
      return {...state, fetchingClients: false, list: withID, didFetch: true};

    case "CREATE_CLIENT":
      const createWithID = {...action.payload}
      return {...state, list: [...state.list, createWithID]};

    case "PATCH_CLIENT":
      let index = -1
      const patchedClients = state.list.map((client, idx) => {
        if(client.id === action.payload.id){
          index = idx
          return action.payload;
        }
        return client;
      })
      return {...state, list: patchedClients, selectedClient: patchedClients[index]};

    case "DESTROY_CLIENT":
      const filteredClients = state.list.filter(client => client.id !== action.payload)
      return {...state, list: filteredClients, selectedClient: {}};

    case "ADD_ID_TO_NEW_CLIENT":
      if(!state.list[state.list.length - 1].id){
        const createdWithID = state.list[state.list.length - 1]
        createdWithID.id = action.payload
        return{...state, list: [...state.list.slice(0, -1), createdWithID]}
      }
      return state;

    case "SELECT_CLIENT":
      return {...state, selectedClient: action.payload}

    case "SELECT_PROJECT":
      return {...state, selectedClient: findByID(state.list, action.payload.clientID)};

    case "SELECT_PIECE":
      return {...state, selectedClient: findByID(state.list, action.payload.clientID)};

    default:
      return state;
  }
}
