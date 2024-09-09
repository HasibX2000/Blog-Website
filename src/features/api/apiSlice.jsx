// File: apiSlice.js
// This file defines API endpoints for post queries using Supabase with RTK Query.

import { createApi } from "@reduxjs/toolkit/query/react";
import supabase from "../../configs/supabase";

// Define the API slice for interacting with Supabase
export const apiSlice = createApi({
  reducerPath: "apiSlice", // The key in the Redux store for this API slice
  baseQuery: async (args, api, extraOptions) => {
    // Extract arguments for various operations
    const {
      newPost,
      deletePostId,
      updatePostId,
      updatePostData,
      categoryName,
      postId,
      postTitle,
      relatedPostId,
      searchTerm,
    } = args;

    let fetchFunction;

    // Handle creating a new post
    if (newPost) {
      try {
        const { data, error } = await supabase
          .from("posts")
          .insert([newPost])
          .single();
        if (error) throw new Error(error.message);
        return { data }; // Return the data if successful
      } catch (error) {
        return { error: { message: error.message } }; // Return error message if there was an error
      }
    }

    // Handle deleting a post
    if (deletePostId) {
      try {
        const { data, error } = await supabase
          .from("posts")
          .delete()
          .match({ id: deletePostId });
        if (error) throw new Error(error.message);
        return { data }; // Return the data if successful
      } catch (error) {
        return { error: { message: error.message } }; // Return error message if there was an error
      }
    }

    // Handle updating a post
    if (updatePostId && updatePostData) {
      try {
        const { data, error } = await supabase
          .from("posts")
          .update(updatePostData)
          .match({ id: updatePostId });
        if (error) throw new Error(error.message);
        return { data }; // Return the updated data if successful
      } catch (error) {
        return { error: { message: error.message } }; // Return error message if there was an error
      }
    }

    // Define fetchFunction based on the provided arguments

    // Fetch posts by category
    if (categoryName) {
      fetchFunction = async () => {
        const { data: posts, error } = await supabase
          .from("posts")
          .select("*")
          .eq("category", categoryName);
        if (error) throw new Error(error.message);
        return posts; // Return posts that match the category
      };
    }
    // Fetch post by ID
    else if (postId) {
      fetchFunction = async () => {
        const { data: post, error } = await supabase
          .from("posts")
          .select("*")
          .eq("id", postId)
          .single();
        if (error) throw new Error(error.message);
        return post; // Return the post with the specified ID
      };
    }
    // Fetch post by title
    else if (postTitle) {
      fetchFunction = async () => {
        const { data: post, error } = await supabase
          .from("posts")
          .select("*")
          .eq("title", postTitle)
          .single();
        if (error) throw new Error(error.message);
        return post; // Return the post with the specified title
      };
    }
    // Fetch related posts based on the category of the related post
    else if (relatedPostId) {
      fetchFunction = async () => {
        const { data: postData, error } = await supabase
          .from("posts")
          .select("category")
          .eq("id", relatedPostId)
          .single();
        if (error) throw new Error(error.message);

        const category = postData?.category;
        if (!category) throw new Error("Post not found.");

        const { data: relatedPosts, error: relatedPostsError } = await supabase
          .from("posts")
          .select("*")
          .eq("category", category)
          .neq("id", relatedPostId)
          .limit(5);
        if (relatedPostsError) throw new Error(relatedPostsError.message);
        return relatedPosts; // Return related posts based on the category
      };
    }
    // Search posts by term
    else if (searchTerm) {
      fetchFunction = async () => {
        const { data: posts, error } = await supabase
          .from("posts")
          .select("*")
          .or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`);
        if (error) throw new Error(error.message);
        return posts; // Return posts that match the search term
      };
    } else {
      return { error: { message: "No valid parameters provided" } }; // Handle invalid parameters
    }

    try {
      const data = await fetchFunction(); // Call the appropriate fetch function
      return { data }; // Return the fetched data
    } catch (error) {
      return { error: { message: error.message } }; // Return error message if there was an error
    }
  },
  tagTypes: ["Categories", "Related", "Latest", "Posts"], // Tags for cache invalidation
  endpoints: (builder) => ({
    // Mutation for creating a new post
    createPost: builder.mutation({
      query: (newPost) => ({
        newPost,
      }),
      async onQueryStarted(newPost, { dispatch, queryFulfilled }) {
        try {
          // Update the cache with the new post for relevant queries
          const patchResultLatest = dispatch(
            apiSlice.util.updateQueryData(
              "getLatestPosts",
              undefined,
              (draft) => {
                draft.unshift(newPost);
              }
            )
          );

          const patchResultCategory = dispatch(
            apiSlice.util.updateQueryData(
              "getPostsByCategory",
              newPost.category,
              (draft) => {
                draft.unshift(newPost);
              }
            )
          );

          await queryFulfilled; // Wait for the mutation to complete
        } catch {
          // Undo cache updates if the mutation fails
          patchResultLatest.undo();
          patchResultCategory.undo();
        }
      },
    }),
    // Mutation for deleting a post
    deletePost: builder.mutation({
      query: (postId) => ({
        deletePostId: postId,
      }),
      invalidatesTags: ["Categories", "Related", "Latest"], // Invalidate tags to refresh relevant queries
    }),
    // Mutation for updating a post
    updatePost: builder.mutation({
      query: ({ postId, updatePostData }) => ({
        updatePostId: postId,
        updatePostData,
      }),
      async onQueryStarted(
        { postId, updatePostData },
        { dispatch, queryFulfilled }
      ) {
        try {
          // Update the cache with the updated post
          const patchResult = dispatch(
            apiSlice.util.updateQueryData("getPostById", postId, (draft) => {
              return { ...draft, ...updatePostData };
            })
          );
          await queryFulfilled; // Wait for the mutation to complete
        } catch {
          // Undo cache update if the mutation fails
          patchResult.undo();
        }
      },
    }),
    // Query for fetching posts by category
    getPostsByCategory: builder.query({
      query: (categoryName) => ({ categoryName }),
      providesTags: ["Categories"], // Tags to refresh the cache
    }),
    // Query for fetching a post by ID
    getPostById: builder.query({
      query: (postId) => ({ postId }),
      providesTags: ["Posts"], // Tags to refresh the cache
    }),
    // Query for fetching a post by title
    getPostByTitle: builder.query({
      query: (postTitle) => ({ postTitle }),
      providesTags: ["Posts"], // Tags to refresh the cache
    }),
    // Query for fetching related posts
    getRelatedPosts: builder.query({
      query: (relatedPostId) => ({ relatedPostId }),
      providesTags: ["Related"], // Tags to refresh the cache
    }),
    // Query for fetching the latest posts
    getLatestPosts: builder.query({
      queryFn: async () => {
        const { data: posts, error } = await supabase
          .from("posts")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(5);
        if (error) return { error: { message: error.message } };
        return { data: posts }; // Return the latest posts
      },
      providesTags: ["Latest"], // Tags to refresh the cache
    }),
    // Query for searching posts
    searchPosts: builder.query({
      query: (searchTerm) => ({
        searchTerm,
      }),
      async queryFn(searchTerm) {
        if (!searchTerm || searchTerm.trim() === "") {
          return { error: { message: "Search term is required" } }; // Handle missing or empty search term
        }

        try {
          const { data: posts, error } = await supabase
            .from("posts")
            .select("*")
            .or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`);
          if (error) {
            return { error: { message: error.message } };
          }
          return { data: posts }; // Return posts matching the search term
        } catch (error) {
          return { error: { message: error.message } }; // Return error message if there was an error
        }
      },
      providesTags: ["Posts"], // Tags to refresh the cache
    }),
  }),
});

// Export hooks for the API endpoints
export const {
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useGetPostsByCategoryQuery,
  useGetPostByIdQuery,
  useGetPostByTitleQuery,
  useGetRelatedPostsQuery,
  useGetLatestPostsQuery,
  useSearchPostsQuery,
} = apiSlice;

export default apiSlice;
