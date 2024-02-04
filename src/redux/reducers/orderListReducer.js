import { ActionTypes } from "../constants/action-types";
const intialState = {
  orderList: []
};

export const orderListReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_ORDER_LIST:
      return { ...state, orderList: payload };
    default:
      return state;
  }
};