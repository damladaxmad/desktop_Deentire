import { ActionTypes } from "../constants/action-types";
const intialState = {
  services: []
};

export const servicesReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_SERVICES:
      return { ...state, services: payload };
      case ActionTypes.ADD_SERVICE:
      return { 
        ...state, 
        services: [...state.services, payload] };
    default:
      return state;
  }
};