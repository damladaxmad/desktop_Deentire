import { ActionTypes } from "../constants/action-types";
const intialState = {
  serviceTypes: []
};

export const serviceTypesReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_SERVICE_TYPES:
      return { ...state, serviceTypes: payload };

      case ActionTypes.ADD_SERVICE_TYPE:
        return { 
          ...state, 
          serviceTypes: [...state.serviceTypes, payload] };
  
      case ActionTypes.DELETE_SERVICE_TYPE:
        return { 
          ...state, 
          serviceTypes: [...state.serviceTypes.filter(serviceType => serviceType !== payload)] };
    default:
      return state;
  }
};