import { ActionTypes } from "../constants/action-types";

export const setUsers = (data) => {
  return {
    type: ActionTypes.SET_USERS,
    payload: data,
  };
};
