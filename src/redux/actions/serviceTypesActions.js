import { ActionTypes } from "../constants/action-types";

export const setServiceTypes = (data) => {
  return {
    type: ActionTypes.SET_SERVICE_TYPES,
    payload: data,
  };
};

export const addServiceTypes = (data) => {
  return {
    type: ActionTypes.ADD_SERVICE_TYPE,
    payload: data,
  };
};

export const deleteServiceTypes = (data) => {
  return {
    type: ActionTypes.DELETE_SERVICE_TYPE,
    payload: data,
  };
};

