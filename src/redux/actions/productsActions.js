import { ActionTypes } from "../constants/action-types";

export const setProducts = (data) => {
  return {
    type: ActionTypes.SET_PRODUCTS,
    payload: data,
  };
};

export const addProduct = (data) => {
  return {
    type: ActionTypes.ADD_PRODUCT,
    payload: data,
  };
};

export const deleteProduct = (data) => {
  return {
    type: ActionTypes.DELETE_PRODUCT,
    payload: data,
  };
};

export const updateProduct = (data) => {
  return {
    type: ActionTypes.UPDATE_PRODUCT,
    payload: data,
  };
};