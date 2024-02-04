import { ActionTypes } from "../constants/action-types";
const intialState = {
  customers: [],
  isDataFetched: false
};

export const customersReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_CUSTOMERS:
      return { ...state, customers: payload };
      
    case ActionTypes.SET_CUSTOMERS_FETCHED:
      return { ...state, isDataFetched: true };

    case ActionTypes.ADD_CUSTOMER:
        return { 
          ...state, 
          customers: [...state.customers, payload] };
  
      case ActionTypes.DELETE_CUSTOMER:
        return { 
          ...state, 
          customers: [...state.customers.filter(customer => customer._id !== payload?._id)] };
  
          case ActionTypes.UPDATE_CUSTOMER_PROPERTY:
            return {
              ...state,
              customers: state.customers.map((customer) =>
                customer._id === payload.customerId
                  ? { ...customer, ...payload.updatedProperty }
                  : customer
              ),
            };

            case ActionTypes.UPDATE_CUSTOMER: 
            return {
              ...state, 
              customers: state.customers.map(customer => {
                if (customer._id === payload._id) {
                  return { ...customer, ...payload }; // Merge existing properties with payload
                }
                return customer;
              }),
            };

            case 'UPDATE_CUSTOMER_TRANSACTIONS':
      const { customerId, newTransaction } = payload;
      return {
        ...state,
        customers: state.customers.map((customer) => {
          if (customer._id === customerId) {
            const updatedTransactions = Array.isArray(customer.transactions)
              ? [...customer.transactions, newTransaction]
              : [newTransaction];
    
            return {
              ...customer,
              transactions: updatedTransactions,
            };
          }
          return customer;
        }),
      };

      case 'DELETE_CUSTOMER_TRANSACTION':
      const { customerIdD, transactionId } = payload;
      return {
        ...state,
        customers: state.customers.map((customer) => {
          if (customer._id === customerIdD) {
            return {
              ...customer,
              transactions: customer.transactions.filter(
                (transaction) => transaction._id !== transactionId
              ),
            };
          }
          return customer;
        }),
      };
    case 'UPDATE_CUSTOMER_TRANSACTION':
      const { customerIdP, updatedTransaction } = payload;
      return {
        ...state,
        customers: state.customers.map((customer) => {
          if (customer._id === customerIdP) {
            return {
              ...customer,
              transactions: customer.transactions.map((transaction) =>
                transaction._id === updatedTransaction._id
                  ? updatedTransaction
                  : transaction
              ),
            };
          }
          return customer;
        }),
      };
    default:
      return state;
  }
};