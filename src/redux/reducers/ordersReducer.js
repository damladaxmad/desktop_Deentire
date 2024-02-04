import { ActionTypes } from "../constants/action-types";
const intialState = {
  orders: []
};

export const ordersReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_ORDERS:
      return { ...state, orders: payload };
    default:
      return state;
  }
};