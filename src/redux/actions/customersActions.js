import { useSelector } from "react-redux";
import { ActionTypes } from "../constants/action-types";

export const setCustomers = (data) => {
  return {
    type: ActionTypes.SET_CUSTOMERS,
    payload: data,
  };
};

export const setCustomersFetched = (data) => {
  return {
    type: ActionTypes.SET_CUSTOMERS_FETCHED,
    payload: data,
  };
};



export const addCustomer = (data) => {
  data.balance = 0
  data.debit = 0
  data.credit = 0
  data.transaction = []
  return {
    type: ActionTypes.ADD_CUSTOMER,
    payload: data,
  };
};

export const deleteCustomer = (data) => {
  return {
    type: ActionTypes.DELETE_CUSTOMER,
    payload: data,
  };
};

export const updateCustomerProperty = (customerId, updatedProperty) => {
  return {
    type: 'UPDATE_CUSTOMER_PROPERTY',
    payload: {
      customerId,
      updatedProperty,
    },
  };
};

export const updateCustomer = (data) => {
  return {
    type: 'UPDATE_CUSTOMER',
    payload: data,
  };
};

export const updateCustomerTransactions = (customerId, newTransaction) => {
  return {
    type: 'UPDATE_CUSTOMER_TRANSACTIONS',
    payload: {
      customerId,
      newTransaction,
    },
  };
};

export const deleteCustomerTransaction = (customerIdD, transactionId) => {
  return {
    type: 'DELETE_CUSTOMER_TRANSACTION',
    payload: {
      customerIdD,
      transactionId,
    },
  };
};

// Redux action to update a transaction for a customer
export const updateCustomerTransaction = (customerIdP, updatedTransaction) => {
  return {
    type: 'UPDATE_CUSTOMER_TRANSACTION',
    payload: {
      customerIdP,
      updatedTransaction,
    },
  };
};