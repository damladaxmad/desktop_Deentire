import { ActionTypes } from "../constants/action-types";
const intialState = {
  amaano: [],
  isDataFetched: false
};

export const amaanoReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_AMAANO:
      return { ...state, amaano: payload };
      
    case ActionTypes.SET_AMAANO_FETCHED:
      return { ...state, isDataFetched: true };

    case ActionTypes.ADD_AMAANO:
        return { 
          ...state, 
          amaano: [...state.amaano, payload] };
  
      case ActionTypes.DELETE_AMAANO:
        return { 
          ...state, 
          amaano: [...state.amaano.filter(am => am._id !== payload?._id)] };
  
          case ActionTypes.UPDATE_AMAANO_PROPERTY:
            return {
              ...state,
              amaano: state.amaano.map((am) =>
                am._id === payload.amaanoId
                  ? { ...am, ...payload.updatedProperty }
                  : am
              ),
            };

            case ActionTypes.UPDATE_AMAANO: 
            return {
              ...state, 
              amaano: state.amaano.map(am => {
                if (am._id === payload._id) {
                  return { ...am, ...payload }; // Merge existing properties with payload
                }
                return am;
              }),
            };
    default:
      return state;
  }
};