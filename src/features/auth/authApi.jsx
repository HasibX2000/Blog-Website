// File: authApi.js
// This file defines API endpoints for authentication using Supabase with RTK Query.

import apiSlice from "../api/apiSlice";
import supabase from "../../configs/supabase";

// Inject authentication-related endpoints into the apiSlice
const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint for user registration
    signUp: builder.mutation({
      async queryFn({ email, password }) {
        // Call Supabase to sign up a new user
        const {
          data: { user },
          error,
        } = await supabase.auth.signUp({ email, password });

        // If there's an error during signup, return a custom error message
        if (error)
          return { error: { status: "CUSTOM_ERROR", data: error.message } };

        // Return user data on successful signup
        return { data: user };
      },
      invalidatesTags: ["User"], // Invalidates 'User' tag to trigger refetching of related queries
    }),

    // Endpoint for user login
    signIn: builder.mutation({
      async queryFn({ email, password }) {
        // Call Supabase to sign in an existing user
        const {
          data: { session },
          error,
        } = await supabase.auth.signInWithPassword({ email, password });

        // If there's an error during sign-in, return a custom error message
        if (error)
          return { error: { status: "CUSTOM_ERROR", data: error.message } };

        // Return session data on successful sign-in
        return { data: session };
      },
      invalidatesTags: ["User"], // Invalidates 'User' tag to trigger refetching of related queries
    }),

    // Endpoint for user logout
    signOut: builder.mutation({
      async queryFn() {
        // Call Supabase to sign out the current user
        const { error } = await supabase.auth.signOut();

        // If there's an error during sign-out, return a custom error message
        if (error)
          return { error: { status: "CUSTOM_ERROR", data: error.message } };

        // Return success status on successful sign-out
        return { data: true };
      },
      invalidatesTags: ["User"], // Invalidates 'User' tag to trigger refetching of related queries
    }),

    // Endpoint to get the current user
    getUser: builder.query({
      async queryFn() {
        // Call Supabase to get the current user
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        // If there's an error fetching the user, return a custom error message
        if (error)
          return { error: { status: "CUSTOM_ERROR", data: error.message } };

        // Return user data if user is logged in
        if (user) return { data: user };

        // Return an error message if no user is logged in
        return { error: { status: "CUSTOM_ERROR", data: "No user logged in" } };
      },
      providesTags: ["User"], // Provides 'User' tag for related queries
    }),
    // Add more auth-related endpoints as needed
  }),
  overrideExisting: false, // Prevents overwriting existing endpoints
});

// Export hooks for using the defined endpoints in components
export const {
  useGetUserQuery,
  useSignInMutation,
  useSignOutMutation,
  useSignUpMutation,
} = authApi;

export default authApi;
