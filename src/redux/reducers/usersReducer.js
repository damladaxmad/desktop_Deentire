import { ActionTypes } from "../constants/action-types";
const intialState = {
  users: [],
};

const initState = {
  activeUser: ""
};

export const usersReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_USERS:
      return { ...state, users: payload };
    default:
      return state;
  }
};

export const activeUserReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_ACTIVE_USER:
      return { ...state, activeUser: payload };
    default:
      return state;
  }
};