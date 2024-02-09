import { configureStore } from "@reduxjs/toolkit";

import logger from "redux-logger"
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PURGE,
  REGISTER,
  persistCombineReducers,
  PERSIST
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import apiSlice from "../features/api/apiSlice";
import uploadSlice from "../features/upload/uploadSlice";
import authSlice from "../features/auth/authSlice";
import updateSlice from "../features/update/updateSlice";

const persistConfig = {
  key: 'root',
  version: 1,
  storage
}

const allReducers = {
  [apiSlice.reducerPath]: apiSlice.reducer,
  upload: uploadSlice,
  update: updateSlice,
  auth: authSlice,
}
const persistedReducer = persistCombineReducers(persistConfig, allReducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PURGE, REGISTER, PERSIST]
      }
    }).concat(apiSlice.middleware, logger),
});

export default store;
