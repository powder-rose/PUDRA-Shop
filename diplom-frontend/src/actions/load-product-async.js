import { setProductData } from "./set-product-data";
import { request } from "../utilits/request.js";

export const loadProductAsync = (productId) => {
  return async (dispatch) => {
    const { error, data } = await request(`/products/${productId}`);

    if (error) {
      console.error(error);
      return;
    }

    dispatch(setProductData(data.data));
  };
};
