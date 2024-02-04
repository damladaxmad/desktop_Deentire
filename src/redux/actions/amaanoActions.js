import { useSelector } from "react-redux";
import { ActionTypes } from "../constants/action-types";

export const setAmaano = (data) => {
  return {
    type: ActionTypes.SET_AMAANO,
    payload: data,
  };
};

export const setAmaanoFetched = (data) => {
  return {
    type: ActionTypes.SET_AMAANO_FETCHED,
    payload: data,
  };
};



export const addAmaano = (data) => {
  data.balance = 0
  data.debit = 0
  data.credit = 0
  data.transaction = []
  return {
    type: ActionTypes.ADD_AMAANO,
    payload: data,
  };
};

export const deleteAmaano = (data) => {
  return {
    type: ActionTypes.DELETE_AMAANO,
    payload: data,
  };
};

export const updateAmaanoProperty = (amaanoId, updatedProperty) => {
  return {
    type: 'UPDATE_AMAANO_PROPERTY',
    payload: {
      amaanoId,
      updatedProperty,
    },
  };
};

export const updateAmaano = (data) => {
  return {
    type: 'UPDATE_AMAANO',
    payload: data,
  };
};