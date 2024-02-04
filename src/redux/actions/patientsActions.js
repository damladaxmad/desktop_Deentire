import { ActionTypes } from "../constants/action-types";

export const setPatients = (data) => {
  return {
    type: ActionTypes.SET_PATIENTS,
    payload: data,
  };
};

export const addPatient = (data) => {
  return {
    type: ActionTypes.ADD_PATIENT,
    payload: data,
  };
};

export const deletePatient = (data) => {
  return {
    type: ActionTypes.DELETE_PATIENT,
    payload: data,
  };
};

export const updatePatient = (data) => {
  return {
    type: ActionTypes.UPDATE_PATIENT,
    payload: data,
  };
};