import { ActionTypes } from "../constants/action-types";

export const setStyles = (data) => {
  return {
    type: ActionTypes.SET_STYLES,
    payload: data,
  };
};