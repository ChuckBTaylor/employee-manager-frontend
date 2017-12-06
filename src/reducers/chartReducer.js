export default function chartReducer(state = {
  projectData: {
    totalWorked: -1,
    totalEst: -1
  },
  fetchingProjectData: false,
  didFetchProject: false
}, action){
  switch(action.type){

    case "FETCHING_PROJECT_DATA":
      return {...state, fetchingProjectData: true};

    case "FETCHED_PROJECT_DATA":
      return {...state, fetchingProjectData: false, projectData: action.payload, didFetchProject: true};

    case "RESET_PROJECT_DATA":
      return {...state, didFetchProject: false}

    default:
      return state;
  }
}
