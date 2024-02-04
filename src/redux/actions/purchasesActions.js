import { ActionTypes } from "../constants/action-types";

export const setPurchases = (data) => {
  return {
    type: ActionTypes.SET_PURCHASES,
    payload: data,
  };
};

export const addPurchase = (data) => {
  return {
    type: ActionTypes.ADD_PURCHASE,
    payload: data,
  };
};