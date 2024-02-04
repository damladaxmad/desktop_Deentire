import { ActionTypes } from "../constants/action-types";


const initState = {
  socketId: ""
};


export const socketIdReducer = (state = initState, { type, payload }) => {
    switch (type) {
      case ActionTypes.SET_SOCKET:
        return { ...state, socketId: payload };
      default:
        return state;
    }
  };