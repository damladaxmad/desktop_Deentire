import { ActionTypes } from "../constants/action-types";

export const setOrders = (data) => {
  return {
    type: ActionTypes.SET_ORDERS,
    payload: data,
  };
};