import { ActionTypes } from "../constants/action-types";
const intialState = {
  tableTestData: []
};

export const tableTestDataReducer = (state = intialState, { type, payload }) => {
  switch (type) {

    case ActionTypes.SET_TABLE_TEST_DATA:
      return { ...state, tableTestData: payload };

    case ActionTypes.ADD_TABLE_TEST_DATA:
        return { 
          ...state, 
          tableTestData: [...state.tableTestData, payload] };
  
      case ActionTypes.DELETE_TABLE_TEST_DATA:
        return { 
          ...state, 
          tableTestData: [...state.tableTestData.filter(data => data !== payload)] };
  
   
    default:
      return state;
  }
};