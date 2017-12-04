
export default function serviceReducer(state = {
  list: [],
  selectedService: {},
  fetchingServices: false,
  didFetch: false
}, action){
  switch(action.type){

    case "FETCHING_SERVICES":
      return state.didFetch ? state : {...state, fetchingServices: true};

    case "FETCHED_SERVICES":
      const withID = action.payload.map(service => ({name: service.name, id: service.id, defaultTime: service.default_time}))
      return {...state, list: withID, fetchingServices: false, didFetch: true};

    case "CREATE_SERVICE":
      const createWithID = {...action.payload}
      return {...state, list: [...state.list, createWithID]};

    case "ADD_ID_TO_NEW_SERVICE":
      if(!state.list[state.list.length - 1].id){
        const createdWithID = {...state.list[state.list.length - 1]}
        createdWithID.id = action.payload
        return{...state, list: [...state.list.slice(0, -1), createdWithID]};
      }
      return state;

    case "PATCH_SERVICE":
      let index = -1
      const patchedServices = state.list.map((service, idx) => {
        if(action.payload.id === service.id){
          index = idx
          return action.payload
        }
        return service
      })
      return {...state, list: patchedServices, selectedService: patchedServices[index]};

    case "DESTROY_SERVICE":
      const filteredServices = state.list.filter(service => service.id !== action.payload)
      return {...state, list: filteredServices, selectedService: {}};

    case "SELECT_SERVICE":
      return {...state, selectedService: action.payload};

    default:
      return state;
  }
}
