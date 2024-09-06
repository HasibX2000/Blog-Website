// src/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import apiSlice from "../api/apiSlice";

const initialState = {
  user: null,
  session: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
      state.session = action.payload.session;
    },
    clearUser(state) {
      state.user = null;
      state.session = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // signUp
      .addMatcher(
        apiSlice.endpoints.signUp.matchFulfilled,
        (state, { payload }) => {
          state.user = payload;
          state.error = null;
        }
      )
      .addMatcher(
        apiSlice.endpoints.signUp.matchRejected,
        (state, { error }) => {
          state.error = error.data;
        }
      )
      // signIn
      .addMatcher(
        apiSlice.endpoints.signIn.matchFulfilled,
        (state, { payload }) => {
          state.session = payload;
          state.user = payload.user;
          state.error = null;
        }
      )
      .addMatcher(
        apiSlice.endpoints.signIn.matchRejected,
        (state, { error }) => {
          state.error = error.data;
        }
      )
      // signOut
      .addMatcher(apiSlice.endpoints.signOut.matchFulfilled, (state) => {
        state.user = null;
        state.session = null;
        state.error = null;
      })
      .addMatcher(
        apiSlice.endpoints.signOut.matchRejected,
        (state, { error }) => {
          state.error = error.data;
        }
      );
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
