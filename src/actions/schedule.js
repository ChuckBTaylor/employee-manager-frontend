export function addSchedule(schedule){
  return{
    type: "ADD_SCHEDULE",
    payload: schedule
  }
}


export function someActionCreator(json){
  return {
    type: "SOME_ACTION",
    payload: json
  }
}


export function fetchSomething() {
  return function(dispatch) {
    fetch("SOME_URL")
      .then(res => res.json())
      .then(json => {
        dispatch(someActionCreator(json))
      })
  }
}

// function logANumber(){
//   console.log(Math.random());
// }
//
// export function loggingStuff(){
//   console.log(1)
//   setTimeout(() => {
//     console.log(2)
//   }, 1000)
//   setTimeout(logANumber, 999)
//   for(let i = 4; i<1000; i++){
//     console.log(i)
//   }
//   return null
// }
