import { ActionTypes } from "../constants/action-types";


const initState = {
  token: ""
};


export const tokenReducer = (state = initState, { type, payload }) => {
    switch (type) {
      case ActionTypes.SET_TOKEN:
        return { ...state, token: payload };
      default:
        return state;
    }
  };