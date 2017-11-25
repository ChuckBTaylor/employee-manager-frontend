import cuid from 'cuid';

export default function clientReducer(state = {
  list: [],
  selectedClient: {},
  fetchingClients: false,
  didFetch: false
}, action){
  switch(action.type){

    case "CREATE_CLIENT":
      const createWithCUID = {...action.payload, cuid: cuid()}
      return {...state, list: [...state.list, createWithCUID]};

    case "FETCHING_CLIENTS":
      return state.didFetch ? state : {...state, fetchingClients: true};

    case "FETCHED_CLIENTS":
      if(state.didFetch){
        return state;
      }
      const withCUID = action.payload.map(client => ({name: client.name, scheduleColor: client.schedule_color, id: client.id, cuid: cuid(), isAdmin: client.is_admin}))
      return {...state, fetchingClients: false, list: withCUID, didFetch: true};

    case "PATCH_CLIENT":
      let index = -1
      const patchedClients = state.list.map((client, idx) => {
        if(client.cuid === action.payload.cuid){
          index = idx
          return action.payload;
        }
        return client;
      })
      return {...state, list: patchedClients, selectedClient: patchedClients[index]};

    case "DESTROY_CLIENT":
      const filteredClients = state.list.filter(client => client.cuid !== action.payload)
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

    default:
      return state;
  }
}
