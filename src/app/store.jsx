import { configureStore } from "@reduxjs/toolkit";
import postsApi from "../features/api/apiSlice";

const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
    // Add other reducers if needed
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
});

export default store;
