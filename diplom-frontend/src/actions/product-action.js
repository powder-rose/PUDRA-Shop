import { ACTION_TYPES } from "./action-types.js";

export const addProduct = (product) => ({
  type: ACTION_TYPES.ADD_PRODUCT,
  payload: product,
});
