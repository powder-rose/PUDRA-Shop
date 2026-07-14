import { ACTION_TYPES } from "./action-types.js";

export const setProductData = (productData) => ({
  type: ACTION_TYPES.SET_PRODUCT_DATA,
  payload: productData,
});
