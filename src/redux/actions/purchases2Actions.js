import { ActionTypes } from "../constants/action-types";

export const setPurchases2 = (data) => {
  return {
    type: ActionTypes.SET_PURCHASES_2,
    payload: data,
  };
};