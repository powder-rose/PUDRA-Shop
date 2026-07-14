import { ACTION_TYPES } from "../actions/index.js";

const initialState = "";

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_SEARCH:
      return action.payload;

    default:
      return state;
  }
};
