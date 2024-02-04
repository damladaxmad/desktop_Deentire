import { ActionTypes } from "../constants/action-types";
const intialState = {
  tableData: []
};

export const tableDataReducer = (state = intialState, { type, payload }) => {
  switch (type) {

    case ActionTypes.SET_TABLE_DATA:
      return { ...state, tableData: payload };

    case ActionTypes.ADD_TABLE_DATA:
        return { 
          ...state, 
          tableData: [...state.tableData, payload] };
  
      case ActionTypes.DELETE_TABLE_DATA:
        return { 
          ...state, 
          tableData: [...state.tableData.filter(data => data !== payload)] };
  
   
    default:
      return state;
  }
};