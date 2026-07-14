import { ACTION_TYPES } from "./action-types";

export const setBag = (bag) => ({
  type: ACTION_TYPES.SET_BAG,
  payload: bag,
});
