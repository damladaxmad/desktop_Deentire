import { ActionTypes } from "../constants/action-types";
const intialState = {
  purchases2: []
};

export const purchases2Reducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PURCHASES_2:
      return { ...state, purchases2: payload };
    default:
      return state;
  }
};