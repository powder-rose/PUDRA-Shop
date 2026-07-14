import { ACTION_TYPES } from "./action-types.js";

export const setUser = (user) => ({
  type: ACTION_TYPES.SET_USER,
  payload: user,
});
