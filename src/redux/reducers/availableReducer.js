import { ActionTypes } from "../constants/action-types";


const initState = {
  available: []
};


export const availableReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_AVAILABLE:
      return { ...state, available: payload };
    default:
      return state;
  }
};