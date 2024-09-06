import apiSlice from "../api/apiSlice";
import supabase from "../../configs/supabase";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      async queryFn({ email, password }) {
        const {
          data: { user },
          error,
        } = await supabase.auth.signUp({ email, password });
        if (error)
          return { error: { status: "CUSTOM_ERROR", data: error.message } };
        return { data: user };
      },
      invalidatesTags: ["User"], // Invalidates 'User' tag
    }),
    signIn: builder.mutation({
      async queryFn({ email, password }) {
        const {
          data: { session },
          error,
        } = await supabase.auth.signInWithPassword({ email, password });
        if (error)
          return { error: { status: "CUSTOM_ERROR", data: error.message } };
        return { data: session };
      },
      invalidatesTags: ["User"], // Invalidates 'User' tag
    }),
    signOut: builder.mutation({
      async queryFn() {
        const { error } = await supabase.auth.signOut();
        if (error)
          return { error: { status: "CUSTOM_ERROR", data: error.message } };
        return { data: true };
      },
      invalidatesTags: ["User"], // Invalidates 'User' tag
    }),
    getUser: builder.query({
      async queryFn() {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        if (error)
          return { error: { status: "CUSTOM_ERROR", data: error.message } };
        if (user) return { data: user };
        return { error: { status: "CUSTOM_ERROR", data: "No user logged in" } };
      },
      providesTags: ["User"], // Provides 'User' tag
    }),
    // Add more auth-related endpoints as needed
  }),
  overrideExisting: false,
});

export const {
  useGetUserQuery,
  useSignInMutation,
  useSignOutMutation,
  useSignUpMutation,
} = authApi;
