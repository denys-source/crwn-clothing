import { compose, createStore, applyMiddleware } from "redux";
import { logger } from "redux-logger";
import { thunk } from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { rootReducer } from "./root-reducer";

const middlewares = [process.env.NODE_ENV !== "production" && logger, thunk].filter(
  Boolean,
);

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composerEnhanced =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION__) ||
  compose;

export const store = createStore(
  persistedReducer,
  undefined,
  composerEnhanced(applyMiddleware(...middlewares)),
);

export const persistor = persistStore(store);
