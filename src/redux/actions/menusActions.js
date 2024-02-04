import { ActionTypes } from "../constants/action-types";

export const setMenus = (data) => {
  return {
    type: ActionTypes.SET_MENUS,
    payload: data,
  };
};