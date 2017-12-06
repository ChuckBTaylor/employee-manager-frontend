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

export function formatForSpreadsheet(pps, pieces, projects){
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
