export function findByID(arr, id){
  return arr.find(el => el.id === +id)
}

export function objectArrayToObject(arr, key){
   let obj = {}
   for(let i=0; i<arr.length; i++){
     obj[arr[i][key]] = arr[i]
   }
   return obj;
 }

export function formatProjectForSpreadsheet(project, procedures){
  const formattedProcedures = procedures.map(procedure => {
    return ((({name, estimatedTime, complete, id}) => ({name, estimatedTime, complete, id}))(procedure))
  })
  return {
    ...project,
    procedures: formattedProcedures
  }
}
