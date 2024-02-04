import { ActionTypes } from "../constants/action-types";
const intialState = {
  products: []
};

export const productsReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PRODUCTS:
      return { ...state, products: payload };

    case ActionTypes.ADD_PRODUCT:
      return { 
        ...state, 
        products: [...state.products, payload] };

    case ActionTypes.DELETE_PRODUCT:
      return { 
        ...state, 
        products: [...state.products.filter(product => product._id !== payload._id)] };

    case ActionTypes.UPDATE_PRODUCT: 
        return {
            ...state, 
            products: state.products.map(product => {
                if (product._id == payload._id) {
                   return payload;
                }
                return product;
            }),
        };

    default:
      return state;
  }
};

