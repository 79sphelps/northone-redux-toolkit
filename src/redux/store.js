import { configureStore } from "@reduxjs/toolkit";
import storeReducer from "./storeSlice";

export default configureStore({
  reducer: {
    store: storeReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
