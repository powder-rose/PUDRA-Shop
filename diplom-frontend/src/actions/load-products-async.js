import { setProducts } from "./set-products.js";

export const loadProductsAsync = (requestServer) => async (dispatch) => {
  const { error, res } = await requestServer("fetchProducts");

  if (error) return;

  dispatch(setProducts(res));
};
