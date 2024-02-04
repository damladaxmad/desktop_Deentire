import { ActionTypes } from "../constants/action-types";

export const setEmployees = (data) => {
  return {
    type: ActionTypes.SET_EMPLOYEES,
    payload: data,
  };
};