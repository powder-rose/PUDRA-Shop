import { ACTION_TYPES } from "./index.js";

export const setSearch = (value) => ({
  type: ACTION_TYPES.SET_SEARCH,
  payload: value,
});
