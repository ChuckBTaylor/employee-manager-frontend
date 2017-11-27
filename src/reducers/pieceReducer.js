export default function pieceReducer(state = {
  list: [],
  projectPieces: [],
  selectedPiece: {},
  fetchingPieces: false,
  didFetch: false
}, action){
  switch(action.type){

    case "FETCHING_PIECES":
      return state.didFetch ? state : {...state, fetchingPieces: true};

    case "FETCHED_PIECES":
      const withID = action.payload.map(piece => ({...piece}))
      return {...state, list: withID, fetchingPieces: false, didFetch: true};

    case "CREATE_PIECE":
      const createWithID = {...action.payload}
      return {...state, list: [...state.list, createWithID]};

    case "ADD_ID_TO_NEW_PIECE":
      if(!state.list[state.list.length - 1].id){
        const createdWithID = state.list[state.list.length - 1]
        createdWithID.id = action.payload
        return{...state, list: [...state.list.slice(0, -1), createdWithID]};
      }
      return state;

    case "PATCH_PIECE":
      let index = -1
      const patchedPieces = state.list.map((piece, idx) => {
        if(action.payload.id === piece.id){
          index = idx
          return action.payload
        }
        return piece
      })
      return {...state, list: patchedPieces, selectedPiece: patchedPieces[index]};

    case "DESTROY_PIECE":
      const filteredPieces = state.list.filter(piece => piece.id !== action.payload)
      return {...state, list: filteredPieces, selectedPiece: {}};

    case(!!action.type.match("SELECT") ? action.type : null):
      const projectPieces = state.list.filter(piece => piece.projectID === action.payload.projectID)
      switch(action.type){
        case "SELECT_PROJECT": //Yes, SELECT_PROJECT. A new project is selected, the right pieces are loaded
        return {...state, projectPieces: projectPieces};

        case "SELECT_PIECE":
        return {...state, selectedPiece: action.payload, projectPieces};

        default:
          return state;
      }

    default:
      return state;
  }
}
