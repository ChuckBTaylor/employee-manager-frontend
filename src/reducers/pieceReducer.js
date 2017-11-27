import cuid from 'cuid';

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
      const withCUID = action.payload.map(piece => ({...piece, cuid: cuid()}))
      return {...state, list: withCUID, fetchingPieces: false, didFetch: true};

    case "CREATE_PIECE":
      const createWithCUID = {...action.payload, cuid: cuid()}
      return {...state, list: [...state.list, createWithCUID]};

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
        if(action.payload.cuid === piece.cuid){
          index = idx
          return action.payload
        }
        return piece
      })
      return {...state, list: patchedPieces, selectedPiece: patchedPieces[index]};

    case "DESTROY_PIECE":
      const filteredPieces = state.list.filter(piece => piece.cuid !== action.payload)
      return {...state, list: filteredPieces, selectedPiece: {}};

    case "SELECT_PROJECT": //Yes, SELECT_PROJECT. When a new project is selected, the right pieces are loaded
      const projectPieces = state.list.filter(piece => piece.projectCUID === action.payload.cuid)
      return {...state, projectPieces: projectPieces};

    case "SELECT_PIECE":
      return {...state, selectedPiece: action.payload};

    default:
      return state;
  }
}
