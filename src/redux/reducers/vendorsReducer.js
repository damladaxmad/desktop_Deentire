import { ActionTypes } from "../constants/action-types";
const intialState = {
  vendors: [],
  isDataFetched: false
};

export const vendorsReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_VENDORS:
      return { ...state, vendors: payload };

      case ActionTypes.SET_VENDORS_FETCHED:
        return { ...state, isDataFetched: true };

    case ActionTypes.ADD_VENDOR:
        return { 
          ...state, 
          vendors: [...state.vendors, payload] };
  
      case ActionTypes.DELETE_VENDOR:
        return { 
          ...state, 
          vendors: [...state.vendors.filter(vendor => vendor._id !== payload?._id)] };
  
          case ActionTypes.UPDATE_VENDOR_PROPERTY:
            return {
              ...state,
              vendors: state.vendors.map((vendor) =>
              vendor._id === payload.vendorId
                  ? { ...vendor, ...payload.updatedProperty }
                  : vendor
              ),
            };

            case ActionTypes.UPDATE_VENDOR: 
            return {
              ...state, 
              vendors: state.vendors.map(vendor => {
                if (vendor._id === payload._id) {
                  return { ...vendor, ...payload }; // Merge existing properties with payload
                }
                return vendor;
              }),
            };

            case 'UPDATE_VENDOR_TRANSACTIONS':
              const { vendorId, newTransaction } = payload;
              return {
                ...state,
                vendors: state.vendors.map((vendor) => {
                  if (vendor._id === vendorId) {
                    const updatedTransactions = Array.isArray(vendor.transactions)
                      ? [...vendor.transactions, newTransaction]
                      : [newTransaction];
            
                    return {
                      ...vendor,
                      transactions: updatedTransactions,
                    };
                  }
                  return vendor;
                }),
              };
        
              case 'DELETE_VENDOR_TRANSACTION':
              const { vendorIdD, transactionId } = payload;
              return {
                ...state,
                vendors: state.vendors.map((vendor) => {
                  if (vendor._id === vendorIdD) {
                    return {
                      ...vendor,
                      transactions: vendor.transactions.filter(
                        (transaction) => transaction._id !== transactionId
                      ),
                    };
                  }
                  return vendor;
                }),
              };
            case 'UPDATE_VENDOR_TRANSACTION':
              const { vendorIdP, updatedTransaction } = payload;
              return {
                ...state,
                vendors: state.vendors.map((vendor) => {
                  if (vendor._id === vendorIdP) {
                    return {
                      ...vendor,
                      transactions: vendor.transactions.map((transaction) =>
                        transaction._id === updatedTransaction._id
                          ? updatedTransaction
                          : transaction
                      ),
                    };
                  }
                  return vendor;
                }),
              };
    default:
      return state;
  }
};