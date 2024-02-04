import { ActionTypes } from "../constants/action-types";
const intialState = {
    employeeTitle: []
};

export const employeeTitleReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_EMPLOYEE_TITLE:
      return { ...state, employeeTitle: payload };
    default:
      return state;
  }
};