export function findByCUID(arr, cuid){
  return arr.find(el => el.cuid === cuid)
}

export function findByID(arr, id){
  return arr.find(el => el.id === id)
}
