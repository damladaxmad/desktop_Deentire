import { ActionTypes } from "../constants/action-types";

export const setCategory = (data) => {
  return {
    type: ActionTypes.SET_CATEGORIES,
    payload: data,
  };
};

export const addCategory = (data) => {
  return {
    type: ActionTypes.ADD_CATEGORY,
    payload: data,
  };
};