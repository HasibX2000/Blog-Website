// File: src/features/auth/authSlice.js
// This file defines the Redux slice for managing authentication state, including user and session data,
// as well as handling errors from authentication actions.

import { createSlice } from "@reduxjs/toolkit";
import apiSlice from "../api/apiSlice";

// Initial state for the authentication slice
const initialState = {
  user: null, // Stores the current user object after authentication
  session: null, // Stores the current session object after authentication
  loading: false, // Indicates if authentication-related actions are in progress
  error: null, // Stores any error messages encountered during authentication
};

// Create a slice of the Redux store for authentication
const authSlice = createSlice({
  name: "auth", // Name of the slice, used to identify it in the Redux store
  initialState, // Initial state defined above
  reducers: {
    // Reducer to set the user and session in the state
    setUser(state, action) {
      state.user = action.payload.user; // Set the user object in the state
      state.session = action.payload.session; // Set the session object in the state
    },
    // Reducer to clear the user and session from the state
    clearUser(state) {
      state.user = null; // Clear the user object
      state.session = null; // Clear the session object
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fulfilled state for the signUp endpoint
      .addMatcher(
        apiSlice.endpoints.signUp.matchFulfilled,
        (state, { payload }) => {
          state.user = payload; // Set the user object in the state
          state.error = null; // Clear any previous errors
        }
      )
      // Handle rejected state for the signUp endpoint
      .addMatcher(
        apiSlice.endpoints.signUp.matchRejected,
        (state, { error }) => {
          state.error = error.data; // Set the error message in the state
        }
      )
      // Handle fulfilled state for the signIn endpoint
      .addMatcher(
        apiSlice.endpoints.signIn.matchFulfilled,
        (state, { payload }) => {
          state.session = payload; // Set the session object in the state
          state.user = payload.user; // Set the user object in the state
          state.error = null; // Clear any previous errors
        }
      )
      // Handle rejected state for the signIn endpoint
      .addMatcher(
        apiSlice.endpoints.signIn.matchRejected,
        (state, { error }) => {
          state.error = error.data; // Set the error message in the state
        }
      )
      // Handle fulfilled state for the signOut endpoint
      .addMatcher(apiSlice.endpoints.signOut.matchFulfilled, (state) => {
        state.user = null; // Clear the user object
        state.session = null; // Clear the session object
        state.error = null; // Clear any previous errors
      })
      // Handle rejected state for the signOut endpoint
      .addMatcher(
        apiSlice.endpoints.signOut.matchRejected,
        (state, { error }) => {
          state.error = error.data; // Set the error message in the state
        }
      );
  },
});

// Export actions to update the authentication state
export const { setUser, clearUser } = authSlice.actions;

// Export the reducer to be used in the Redux store
export default authSlice.reducer;
