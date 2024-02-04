import { ActionTypes } from "../constants/action-types";

export const setSocketId = (data) => {
  return {
    type: ActionTypes.SET_SOCKET,
    payload: data,
  };
};
