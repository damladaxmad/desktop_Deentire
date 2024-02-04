import { ActionTypes } from "../constants/action-types";
const intialState = {
    employees: []
};

export const employeesReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_EMPLOYEES:
      return { ...state, employees: payload };
    default:
      return state;
  }
};