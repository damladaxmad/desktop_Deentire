import { ActionTypes } from "../constants/action-types";

export const setToken = (data) => {
  return {
    type: ActionTypes.SET_TOKEN,
    payload: data,
  };
};
