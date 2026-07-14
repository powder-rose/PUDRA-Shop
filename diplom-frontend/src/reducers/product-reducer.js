import { ACTION_TYPES } from "../actions/index.js";

const initialState = {
  id: "",
  title: "",
  desc: "",
  category: "",
  image_url: "",
  count: "",
  price: "",
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_PRODUCT_DATA:
      return {
        ...state,
        ...action.payload,
      };

    case ACTION_TYPES.ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    default:
      return state;
  }
};
