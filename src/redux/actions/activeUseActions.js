import { ActionTypes } from "../constants/action-types";

export const setActiveUser = (data) => {
  return {
    type: ActionTypes.SET_ACTIVE_USER,
    payload: data,
  };
};