// src/features/api/postsApi.js

import { createApi } from "@reduxjs/toolkit/query/react";
import supabase from "../../configs/supabase";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: async (args, api, extraOptions) => {
    const { newPost } = args;

    if (newPost) {
      try {
        const { data, error } = await supabase
          .from("posts")
          .insert([newPost])
          .single();

        if (error) {
          throw new Error(error.message);
        }

        return { data };
      } catch (error) {
        return { error: { message: error.message } };
      }
    }

    return { error: { message: "No valid data provided" } };
  },
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (newPost) => ({
        newPost,
      }),
    }),
  }),
});

export const { useCreatePostMutation } = postsApi;
