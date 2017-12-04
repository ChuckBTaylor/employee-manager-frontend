export default function userReducer(state = {
  currentUser: {},
  isLoggedIn: !!localStorage.getItem('jwtToken'),
  loggingIn: false,
  errorMessage: "",
  logInFailed: false
}, action){
  switch(action.type){
    case "LOGGING_IN":
      return {...state, loggingIn: true, logInFailed: false, errorMessage: ""};

    case "LOG_IN":
      localStorage.setItem('jwtToken', action.payload.jwtToken)
      return {...state, loggingIn: false, isLoggedIn: true, currentUser: action.payload.user};

    case "LOG_OUT":
    console.log('removing jwtToken');
    localStorage.removeItem('jwtToken')
      return {...state, isLoggedIn: false, currentUser: {}};

    case "LOG_IN_FAILED":
      return {...state, errorMessage: action.payload, logInFailed: true}

    default:
      return state;
  }
}
