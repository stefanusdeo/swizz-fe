import { createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./reducers";
// initial states here
// import logger from 'redux-logger';

const initalState = {};
// middleware
// let middlewares = [thunk];
// if (process.env.NODE_ENV === 'development') {
//   middleware = [...middleware, logger];
// }
// creating store
export const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(...middlewares),
});

// assigning store to next wrapper
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);