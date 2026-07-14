import { ACTION_TYPES } from "../actions";

const initialState = [];

export const bagReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_BAG:
      return action.payload;

    default:
      return state;
  }
};
