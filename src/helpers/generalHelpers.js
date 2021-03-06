export function findByID(arr, id, key='id'){
  return arr.find(el => el[key] === +id)
}

export function objectArrayToObject(arr, key){
   let obj = {}
   for(let i=0; i<arr.length; i++){
     obj[arr[i][key]] = arr[i]
   }
   return obj;
 }

export function formatForSpreadsheet(pps = [], pieces = [], projects = []){
  const pieceIDs = [...new Set(pps.map(pp => pp.pieceID))]
  const filteredPieces = pieceIDs.map(id => findByID(pieces, id))
  const projectIDs = [...new Set(filteredPieces.map(piece => piece.projectID))]
  const filteredProjects = projectIDs.map(id => findByID(projects, id))
  return {pps, pieces: filteredPieces, projects: filteredProjects}
}


export function calculateTimeWorked(allottedTime, timeWorkedThisWeek){
  const arr = [[{
        time: timeWorkedThisWeek <= allottedTime ? (allottedTime - timeWorkedThisWeek) : 0,
        name: "Allotted Time Remaining"
      },
      {
        time: timeWorkedThisWeek > allottedTime ? (allottedTime) : timeWorkedThisWeek,
        name: "Time worked this week"
      }]]
  if(timeWorkedThisWeek > allottedTime){
    arr.push([{
          time: timeWorkedThisWeek - allottedTime,
          name: "Time Over"
        },
        {
          time: allottedTime * 2 - timeWorkedThisWeek,
          name: ""
        }])}
  return arr
}

export function allPPArray(statePPs){
  const arr = []
  Object.keys(statePPs).forEach(plannerID => {
    statePPs[plannerID].forEach(pp => {
      arr.push(pp)
    })
  })
  return arr
}

export function getOpsFromPPs(pps){
  let arr = []
  pps.forEach(pp => {
    pp.operations.forEach(op => {
      arr.push(op)
    })
  })
  return arr
}

export function totalKeyTimeWorkedforID(id, key, statePPs){
  const pps = allPPArray(statePPs)
  return getOpsFromPPs(pps.filter(pp => pp[key] === id)).reduce((agg, op) => agg + op.hours, 0)
}

export function totalBidTimeForProject(projectID, stateProcedures){
  const procedures = stateProcedures.filter(procedure => procedure.projectID === projectID)
  return procedures.reduce((agg, procedure) => agg + procedure.estimatedTime, 0)
}

export function totalBidTimeForPiece(pieceID, stateProcedures){
  const procedures = stateProcedures.filter(procedure => procedure.pieceID === pieceID)
  return procedures.reduce((agg, procedure) => agg + procedure.estimatedTime, 0)
}

export function totalPieceTimeWorked(piece, statePPs){

}



export function randomColorArray(length){
  const arr = []
  for(let i=0; i<length;i++){
    arr.push('#'+(Math.random()*0xFFFFFF<<0).toString(16))
  }
  return arr;
}
