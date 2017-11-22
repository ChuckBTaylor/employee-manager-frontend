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
