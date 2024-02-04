import { ActionTypes } from "../constants/action-types";

export const setSales = (data) => {
  return {
    type: ActionTypes.SET_SALES,
    payload: data,
  };
};

export const addSale = (data) => {
  return {
    type: ActionTypes.ADD_SALE,
    payload: data,
  };
};