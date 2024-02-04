import { ActionTypes } from "../constants/action-types";

export const setVendors = (data) => {
  return {
    type: ActionTypes.SET_VENDORS,
    payload: data,
  };
};

export const setVendorsFetched = (data) => {
  return {
    type: ActionTypes.SET_VENDORS_FETCHED,
    payload: data,
  };
};


export const addVendor = (data) => {
  data.balance = 0
  data.debit = 0
  data.credit = 0
  data.transaction = []
  return {
    type: ActionTypes.ADD_VENDOR,
    payload: data,
  };
};

export const deleteVendor = (data) => {
  return {
    type: ActionTypes.DELETE_VENDOR,
    payload: data,
  };
};

export const updateVendorProperty = (vendorId, updatedProperty) => {
  return {
    type: 'UPDATE_VENDOR_PROPERTY',
    payload: {
      vendorId,
      updatedProperty,
    },
  };
};

export const updateVendor = (data) => {
  return {
    type: 'UPDATE_VENDOR',
    payload: data,
  };
};


export const updateVendorTransactions = (vendorId, newTransaction) => {
  return {
    type: 'UPDATE_VENDOR_TRANSACTIONS',
    payload: {
      vendorId,
      newTransaction,
    },
  };
};

export const deleteVendorTransaction = (vendorIdD, transactionId) => {
  return {
    type: 'DELETE_VENDOR_TRANSACTION',
    payload: {
      vendorIdD,
      transactionId,
    },
  };
};

// Redux action to update a transaction for a customer
export const updateVendorTransaction = (vendorIdP, updatedTransaction) => {
  return {
    type: 'UPDATE_VENDOR_TRANSACTION',
    payload: {
      vendorIdP,
      updatedTransaction,
    },
  };
};