import { ActionTypes } from "../constants/action-types";
const intialState = {
  menus: []
};

export const menusReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_MENUS:
      return { ...state, menus: payload };
    default:
      return state;
  }
};