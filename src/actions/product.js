import api from '../services/apiRequests'

export function fetchProducts(){
  return function(dispatch){
    dispatch({type: "FETCHING_PRODUCTS"})
    api().product.fetch()
      .then(json => dispatch({type: "FETCHED_PRODUCTS", payload: json}))
  }
}

export function createProduct(product){
  return function(dispatch){
    api().product.post(product)
  }
}

export function patchProduct(product){
  return function(dispatch){
    api().product.patch(product)
    dispatch({type: "PATCH_PRODUCT", payload: product})
  }
}

export function destroyProduct(product){
  return function(dispatch){
    api().product.destroy(product)
    dispatch({type: "DESTROY_PRODUCT", payload: product.cuid})
  }
}

export function selectProduct(product){
  return {
    type: "SELECT_PRODUCT",
    payload: product
  }
}
