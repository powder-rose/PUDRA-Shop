import { ACTION_TYPES } from "../actions/index.js";

const initialAppState = {
  wasLogout: false,
};

export const appReducer = (state = initialAppState, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGOUT:
      return {
        ...state,
        wasLogout: !state.wasLogout,
      };
    default:
      return state;
  }
};
