import { ActionTypes } from "../constants/action-types";
const intialState = {
    companyInfo: {}
};

export const companyInfoReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_COMPANY_INFO:
      return { ...state, companyInfo: payload };
    default:
      return state;
  }
};