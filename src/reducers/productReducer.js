import cuid from 'cuid';

export default function productReducer(state = {
  list: [],
  selectedProduct: {}
}, action){
  switch(action.type){
    default:
      return state;
  }
}
