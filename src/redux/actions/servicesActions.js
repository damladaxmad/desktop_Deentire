import { ActionTypes } from "../constants/action-types";

export const setServices = (data) => {
  return {
    type: ActionTypes.SET_SERVICES,
    payload: data,
  };
};

export const addService = (data) => {
  return {
    type: ActionTypes.ADD_SERVICE,
    payload: data,
  };
};