// src/store/index.js (or wherever your current store.js lives)
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import detailsReducer from "./detailsSlice";
import storageSession from "redux-persist/lib/storage/session"; // <-- sessionStorage
import { persistReducer, persistStore } from "redux-persist";

const rootReducer = combineReducers({
  auth: authReducer,
  details: detailsReducer,
  // add more slices later
});

const persistConfig = {
  key: "root",
  storage: storageSession, // <-- use sessionStorage instead of localStorage
  whitelist: ["auth", "details"], // persist both auth + details
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: false, // redux-persist compat
    }),
});

export const persistor = persistStore(store);
