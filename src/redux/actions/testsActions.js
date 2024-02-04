import { ActionTypes } from "../constants/action-types";

export const setTests = (data) => {
  return {
    type: ActionTypes.SET_TESTS,
    payload: data,
  };
};

export const addTest = (data) => {
  return {
    type: ActionTypes.ADD_TEST,
    payload: data,
  };
};

export const deleteTest = (data) => {
  return {
    type: ActionTypes.DELETE_TEST,
    payload: data,
  };
};

export const updateTest = (data) => {
  return {
    type: ActionTypes.UPDATE_TEST,
    payload: data,
  };
};