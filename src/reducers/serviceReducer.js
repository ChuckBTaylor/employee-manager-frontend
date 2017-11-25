import cuid from 'cuid';

export default function serviceReducer(state = {
  list: [],
  selectedService: {},
  fetchingServices: false,
  didFetch: false
}, action){
  switch(action.type){

    case "FETCHING_PRODUCTS":
      return state.didFetch ? state : {...state, fetchingServices: true};

    case "FETCHED_PRODUCTS":
      const withCUID = action.payload.map(service => ({name: service.name, id: service.id, cuid: cuid()}))
      return {...state, list: withCUID, fetchingServices: false, didFetch: true};

    case "CREATE_PRODUCT":
      const createWithCUID = {...action.payload, cuid: cuid()}
      return {...state, list: [...state.list, createWithCUID]};

    case "ADD_ID_TO_NEW_PRODUCT":
      if(!state.list[state.list.length - 1].id){
        const createdWithID = state.list[state.list.length - 1]
        createdWithID.id = action.payload
        return{...state, list: [...state.list.slice(0, -1), createdWithID]};
      }
      return state;

    case "PATCH_PRODUCT":
      let index = -1
      const patchedServices = state.list.map((service, idx) => {
        if(action.payload.cuid === service.cuid){
          index = idx
          return action.payload
        }
        return service
      })
      return {...state, list: patchedServices, selectedService: patchedServices[index]};

    case "DESTROY_PRODUCT":
      const filteredServices = state.list.filter(service => service.cuid !== action.payload)
      return {...state, list: filteredServices, selectedService: {}};

    case "SELECT_PRODUCT":
      return {...state, selectedService: action.payload};

    default:
      return state;
  }
}
