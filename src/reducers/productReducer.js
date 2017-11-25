import cuid from 'cuid';

export default function productReducer(state = {
  list: [],
  selectedProduct: {},
  fetchingProducts: false,
  didFetch: false
}, action){
  switch(action.type){

    case "CREATE_PRODUCT":
      const createWithCUID = {...action.payload, cuid: cuid()}
      return {...state, list: [...state.list, createWithCUID]};

    case "FETCHING_PRODUCTS":
      return state.didFetch ? state : {...state, fetchingProducts: true};

    case "FETCHED_PRODUCTS":
      const withCUID = action.payload.map(product => ({name: product.name, id: product.id, cuid: cuid()}))
      return {...state, list: withCUID, fetchingProducts: false, didFetch: true};

    case "PATCH_PRODUCT":
      let index = -1
      const patchedProdcuts = state.list.map((product, idx) => {
        if(action.payload.cuid === product.cuid){
          index = idx
          return action.payload
        }
        return product
      })
      return {...state, list: patchedProdcuts, selectedProduct: patchedProdcuts[index]};

    case "DESTROY_PRODUCT":
      const filteredProducts = state.list.filter(product => product.cuid !== action.payload)
      return {...state, list: filteredProducts, selectedProduct: filteredProducts[0] || {}};

    case "SELECT_PRODUCT":
      return {...state, selectedProduct: action.payload};

    default:
      return state;
  }
}
