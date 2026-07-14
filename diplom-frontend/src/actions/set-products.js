import { ACTION_TYPES } from "./action-types";

export const setProducts = (products) => ({
  type: ACTION_TYPES.SET_PRODUCTS,
  payload: products,
});
