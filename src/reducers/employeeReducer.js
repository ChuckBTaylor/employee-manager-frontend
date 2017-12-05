export default function employeeReducer(state = {
  list: [],
  selectedEmployee: {},
  fetchingEmployees: false,
  didFetch: false
}, action){
  switch(action.type){

    case "FETCHING_EMPLOYEES":
      return state.didFetch ? state : {...state, fetchingEmployees: true};

    case "FETCHED_EMPLOYEES":
      if(state.didFetch){return state}
      const withID = action.payload.map(employee => ({name: employee.name, scheduleColor: employee.schedule_color, id: employee.id, isAdmin: employee.is_admin}))
      return {...state, fetchingEmployees: false, list: withID, didFetch: true};

    case "CREATE_EMPLOYEE":
      const createWithID = {...action.payload}
      return {...state, list: [...state.list, createWithID]};

    case "ADD_ID_TO_NEW_EMPLOYEE":
      if(!state.list[state.list.length - 1].id){
        const createdWithID = {...state.list[state.list.length - 1]}
        createdWithID.id = action.payload
        return{...state, list: [...state.list.slice(0, -1), createdWithID]};
      }
      return state;

    case "PATCH_EMPLOYEE":
      let index = -1
      const patchedEmployees = state.list.map((employee, idx) => {
        if(employee.id === action.payload.id){
          index = idx
          return action.payload;
        }
        return employee;
      })
      return {...state, list: patchedEmployees, selectedEmployee: patchedEmployees[index]};

    case "DESTROY_EMPLOYEE":
      const filteredEmployees = state.list.filter(employee => employee.id !== action.payload)
      return {...state, list: filteredEmployees, selectedEmployee: {}};

    case "SELECT_EMPLOYEE":
      return {...state, selectedEmployee: action.payload};

    case "LOG_OUT":
      return {...state, list: [], selectedEmployee: {}, didFetch: false};

    default:
      return state;
  }
}
