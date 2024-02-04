import { ActionTypes } from "../constants/action-types";

export const setEmployeeTitle = (data) => {
  return {
    type: ActionTypes.SET_EMPLOYEE_TITLE,
    payload: data,
  };
};