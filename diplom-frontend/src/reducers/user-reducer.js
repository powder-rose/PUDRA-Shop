import { ROLE } from "../assets/constants";
import { ACTION_TYPES } from "../actions/index.js";

const initialUserState = {
  session: null,
  id: null,
  login: null,
  roleId: ROLE.GUEST,
  isAuthChecked: false,
};

export const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_USER: {
      return { ...state, ...action.payload };
    }

    case ACTION_TYPES.LOGOUT:
      return initialUserState;

    default:
      return state;
  }
};
