import cuid from 'cuid';

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
      if(state.didFetch){
        return state;
      }
      const withCUID = action.payload.map(employee => ({name: employee.name, scheduleColor: employee.schedule_color, id: employee.id, cuid: cuid(), isAdmin: employee.is_admin}))
      return {...state, fetchingEmployees: false, list: withCUID, didFetch: true};

    case "CREATE_EMPLOYEE":
      const createWithCUID = {...action.payload, cuid: cuid()}
      return {...state, list: [...state.list, createWithCUID]};

    case "ADD_ID_TO_NEW_EMPLOYEE":
      if(!state.list[state.list.length - 1].id){
        const createdWithID = state.list[state.list.length - 1]
        createdWithID.id = action.payload
        return{...state, list: [...state.list.slice(0, -1), createdWithID]};
      }
      return state;

    case "PATCH_EMPLOYEE":
      let index = -1
      const patchedEmployees = state.list.map((employee, idx) => {
        if(employee.cuid === action.payload.cuid){
          index = idx
          return action.payload;
        }
        return employee;
      })
      return {...state, list: patchedEmployees, selectedEmployee: patchedEmployees[index]};

    case "DESTROY_EMPLOYEE":
      const filteredEmployees = state.list.filter(employee => employee.cuid !== action.payload)
      return {...state, list: filteredEmployees, selectedEmployee: {}};

    case "SELECT_EMPLOYEE":
      return {...state, selectedEmployee: action.payload};

    default:
      return state;
  }
}
