import { ActionTypes } from "../constants/action-types";


const initState = {
  activeUser: {}
};


export const activeUserReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_ACTIVE_USER:
      return { ...state, activeUser: payload };
    default:
      return state;
  }
};