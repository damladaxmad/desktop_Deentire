import { ActionTypes } from "../constants/action-types";
const intialState = {
  patients: []
};

export const patientsReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PATIENTS:
      return { ...state, patients: payload };

    case ActionTypes.ADD_PATIENT:
      return { 
        ...state, 
        patients: [...state.patients, payload] };

    case ActionTypes.DELETE_PATIENTT:
      return { 
        ...state, 
        patients: [...state.patients.filter(patient => patient._id !== payload._id)] };

    case ActionTypes.UPDATE_PATIENT: 
        return {
            ...state, 
            patients: state.patients.map(patient => {
                if (patient._id == payload._id) {
                   return payload;
                }
                return patient;
            }),
        };

    default:
      return state;
  }
};

