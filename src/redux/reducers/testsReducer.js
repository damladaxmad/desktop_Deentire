import { ActionTypes } from "../constants/action-types";
const intialState = {
  tests: []
};

export const testsReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_TESTS:
      return { ...state, tests: payload };

    case ActionTypes.ADD_TEST:
      return { 
        ...state, 
        tests: [...state.tests, payload] };

    case ActionTypes.DELETE_TEST:
      return { 
        ...state, 
        tests: [...state.tests.filter(test => test._id !== payload._id)] };

    case ActionTypes.UPDATE_TEST: 
        return {
            ...state, 
            tests: state.tests.map(test => {
                if (test._id == payload._id) {
                   return payload;
                }
                return test;
            }),
        };

    default:
      return state;
  }
};

