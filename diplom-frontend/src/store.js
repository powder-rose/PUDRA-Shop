import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import {
  appReducer,
  userReducer,
  productReducer,
  itemsReducer,
  bagReducer,
  productsReducer,
  searchReducer,
} from "./reducers";

const reducer = combineReducers({
  app: appReducer,
  user: userReducer,
  product: productReducer,
  items: itemsReducer,
  bag: bagReducer,
  products: productsReducer,
  search: searchReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENTION_COMPOSE__ || compose;
export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk)),
);
