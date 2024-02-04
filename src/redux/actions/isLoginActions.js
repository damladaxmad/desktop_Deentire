import { ActionTypes } from "../constants/action-types";


export const setIsLogin = (data) => {
  return {
    type: ActionTypes.SET_IS_LOGIN,
    payload: data,
  };
};

export const setIsReports = (data) => {
  return {
    type: ActionTypes.SET_IS_REPORTS,
    payload: data,
  };
};
export const setIsConnected = (data) => {
  return {
    type: ActionTypes.SET_IS_CONNECTED,
    payload: data,
  };
};