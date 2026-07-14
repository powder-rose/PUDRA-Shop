import { ACTION_TYPES } from "../actions/index.js";

const initialState = [];

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_PRODUCTS:
      return action.payload;

    default:
      return state;
  }
};
