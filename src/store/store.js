import { compose, createStore, applyMiddleware } from "redux";
import { logger } from "redux-logger";
import { rootReducer } from "./root-reducer";

const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    next(action);
  }

  console.log("type: ", action.type);
  console.log("payload: ", action.payload);
  console.log("current state: ", store.getState());

  next(action);

  console.log("next state: ", store.getState());
};

const middlewares = [loggerMiddleware];

export const store = createStore(
  rootReducer,
  undefined,
  compose(applyMiddleware(...middlewares)),
);