import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../features/api/apiSlice";
import authReducer from "../features/auth/authSlice";
import { postsApi } from "../features/posts/postsApi";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    auth: authReducer,
    // Add other reducers if needed
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(postsApi.middleware),
});

export default store;
