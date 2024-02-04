import { ActionTypes } from "../constants/action-types";
const intialState = {
  productTypes: []
};

export const productTypesReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PRODUCT_TYPES:
      return { ...state, productTypes: payload };
    default:
      return state;
  }
};