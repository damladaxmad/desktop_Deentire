import { ActionTypes } from "../constants/action-types";
const intialState = {
    styles: []
};

export const stylesReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_STYLES:
      return { ...state, styles: payload };
    default:
      return state;
  }
};