import { configureStore, Middleware } from "@reduxjs/toolkit";
import { logger } from "redux-logger";
import { persistReducer, persistStore, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "@redux-saga/core";

import { rootSaga } from "./saga-root";
import { rootReducer } from "./root-reducer";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  process.env.NODE_ENV !== "production" && logger,
  sagaMiddleware,
].filter((middleware): middleware is Middleware => Boolean(middleware));

interface RootPersistConfig extends PersistConfig<ReturnType<typeof rootReducer>> {
  whitelist: string[];
}

const persistConfig: RootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middlewares),
});

export type RootState = ReturnType<typeof store.getState>;

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
