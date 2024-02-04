import { ActionTypes } from "../constants/action-types";

export const setProductTypes = (data) => {
  return {
    type: ActionTypes.SET_PRODUCT_TYPES,
    payload: data,
  };
};