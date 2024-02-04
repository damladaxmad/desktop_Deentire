import { ActionTypes } from "../constants/action-types";

export const setAvailable = (data) => {
  return {
    type: ActionTypes.SET_AVAILABLE,
    payload: data,
  };
};