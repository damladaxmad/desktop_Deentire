import { ActionTypes } from "../constants/action-types";
const intialState = {
  dashboard: []
};

export const dashboardReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_DASHBOARD:
      return { ...state, dashboard: payload };
    default:
      return state;
  }
};