import { ActionTypes } from "../constants/action-types";


export const setTableTestData = (data) => {
  return {
    type: ActionTypes.SET_TABLE_TEST_DATA,
    payload: data,
  };
};

export const addTableTestData = (data) => {
  return {
    type: ActionTypes.ADD_TABLE_TEST_DATA,
    payload: data,
  };
};

export const deleteTableTestData = (data) => {
  return {
    type: ActionTypes.DELETE_TABLE_TEST_DATA,
    payload: data,
  };
};

