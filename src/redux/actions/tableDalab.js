import { ActionTypes } from "../constants/action-types";


export const setTableDalab = (data) => {
  return {
    type: ActionTypes.SET_TABLE_DALAB,
    payload: data,
  };
};

export const addTableDalab = (data) => {
  return {
    type: ActionTypes.ADD_TABLE_DALAB,
    payload: data,
  };
};

export const deleteTableDalab = (data) => {
  return {
    type: ActionTypes.DELETE_TABLE_DALAB,
    payload: data,
  };
};

