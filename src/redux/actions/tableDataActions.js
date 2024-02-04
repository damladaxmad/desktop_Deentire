import { ActionTypes } from "../constants/action-types";


export const setTableData = (data) => {
  return {
    type: ActionTypes.SET_TABLE_DATA,
    payload: data,
  };
};

export const addTableData = (data) => {
  return {
    type: ActionTypes.ADD_TABLE_DATA,
    payload: data,
  };
};

export const deleteTableData = (data) => {
  return {
    type: ActionTypes.DELETE_TABLE_DATA,
    payload: data,
  };
};

