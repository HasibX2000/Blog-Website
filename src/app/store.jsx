// File: store.js
// This file configures and creates the Redux store for the application.
// It includes the apiSlice for handling API requests and authSlice for managing authentication state.

import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../features/api/apiSlice";
import authReducer from "../features/auth/authSlice";

const store = configureStore({
  // Defining the root reducer object
  reducer: {
    // Add the reducer from apiSlice (for handling API-related state)
    [apiSlice.reducerPath]: apiSlice.reducer,

    // Add the auth reducer (for handling authentication state)
    auth: authReducer,

    // Add other reducers if needed here
  },

  // Adding middleware: default middleware + the apiSlice middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Export the store to be used throughout the application
export default store;
