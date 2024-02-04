import { ActionTypes } from "../constants/action-types";
const intialState = {
  tableDalab: []
};

export const tableDalabReducer = (state = intialState, { type, payload }) => {
  switch (type) {

    case ActionTypes.SET_TABLE_DALAB:
      return { ...state, tableDalab: payload };

    case ActionTypes.ADD_TABLE_DALAB:
        return { 
          ...state, 
          tableDalab: [...state.tableDalab, payload] };
  
      case ActionTypes.DELETE_TABLE_DALAB:
        return { 
          ...state, 
          tableDalab: [...state.tableDalab.filter(data => data !== payload)] };
  
   
    default:
      return state;
  }
};