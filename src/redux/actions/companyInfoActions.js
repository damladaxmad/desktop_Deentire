import { ActionTypes } from "../constants/action-types";

export const setCompanyInfo = (data) => {
  return {
    type: ActionTypes.SET_COMPANY_INFO,
    payload: data,
  };
};