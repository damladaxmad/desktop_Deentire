import { ActionTypes } from "../constants/action-types";

export const setDashboard = (data) => {
  return {
    type: ActionTypes.SET_DASHBOARD,
    payload: data,
  };
};