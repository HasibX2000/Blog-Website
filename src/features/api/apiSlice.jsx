import { createApi } from "@reduxjs/toolkit/query/react";
import supabase from "../../configs/supabase";

// Define the API slice for interacting with Supabase
export const apiSlice = createApi({
  reducerPath: "apiSlice", // The slice's key in the Redux store
  baseQuery: async (args, api, extraOptions) => {
    // Extract arguments from the `args` object
    const {
      newPost,
      deletePostId,
      updatePostId,
      updatePostData,
      categoryName,
      postId,
      postTitle,
      relatedPostId,
    } = args;

    // Handle creating a new post
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

    // Handle deleting a post
    if (deletePostId) {
      try {
        const { data, error } = await supabase
          .from("posts")
          .delete()
          .match({ id: deletePostId });

        if (error) {
          throw new Error(error.message);
        }

        return { data };
      } catch (error) {
        return { error: { message: error.message } };
      }
    }

    // Handle updating a post
    if (updatePostId && updatePostData) {
      try {
        const { data, error } = await supabase
          .from("posts")
          .update(updatePostData)
          .match({ id: updatePostId });

        if (error) {
          throw new Error(error.message);
        }

        return { data };
      } catch (error) {
        return { error: { message: error.message } };
      }
    }

    // Define a function to fetch data based on the provided arguments
    let fetchFunction;

    // Fetch posts by category
    if (categoryName) {
      fetchFunction = async () => {
        const { data: posts, error: postsError } = await supabase
          .from("posts")
          .select("*")
          .eq("category", categoryName);

        if (postsError) {
          throw new Error(postsError.message);
        }

        return posts;
      };
    }
    // Fetch post by ID
    else if (postId) {
      fetchFunction = async () => {
        const { data: post, error: postError } = await supabase
          .from("posts")
          .select("*")
          .eq("id", postId)
          .single();

        if (postError) {
          throw new Error(postError.message);
        }

        return post;
      };
    }
    // Fetch post by title
    else if (postTitle) {
      fetchFunction = async () => {
        const { data: post, error: postError } = await supabase
          .from("posts")
          .select("*")
          .eq("title", postTitle)
          .single();

        if (postError) {
          throw new Error(postError.message);
        }

        return post;
      };
    }
    // Fetch related posts based on the category of the related post
    else if (relatedPostId) {
      fetchFunction = async () => {
        const { data: postData, error: postError } = await supabase
          .from("posts")
          .select("category")
          .eq("id", relatedPostId)
          .single();

        if (postError) {
          throw new Error(postError.message);
        }

        if (!postData) {
          throw new Error("Post not found.");
        }

        const category = postData.category;

        const { data: relatedPosts, error: relatedPostsError } = await supabase
          .from("posts")
          .select("*")
          .eq("category", category)
          .neq("id", relatedPostId)
          .limit(5);

        if (relatedPostsError) {
          throw new Error(relatedPostsError.message);
        }

        return relatedPosts;
      };
    } else {
      return { error: { message: "No valid ID, title, or name provided" } };
    }

    try {
      const data = await fetchFunction();
      return { data };
    } catch (error) {
      return { error: { message: error.message } };
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
          // Update the cache with the new post
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

          await queryFulfilled;
        } catch {
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
      invalidatesTags: ["Categories", "Related", "Latest"],
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

          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    // Query for fetching posts by category
    getPostsByCategory: builder.query({
      query: (categoryName) => ({ categoryName }),
      providesTags: ["Categories"],
    }),
    // Query for fetching a post by ID
    getPostById: builder.query({
      query: (postId) => ({ postId }),
      providesTags: ["Posts"],
    }),
    // Query for fetching a post by title
    getPostByTitle: builder.query({
      query: (postTitle) => ({ postTitle }),
      providesTags: ["Posts"],
    }),
    // Query for fetching related posts
    getRelatedPosts: builder.query({
      query: (relatedPostId) => ({ relatedPostId }),
      providesTags: ["Related"],
    }),
    // Query for fetching the latest posts
    getLatestPosts: builder.query({
      queryFn: async () => {
        const { data: posts, error: postsError } = await supabase
          .from("posts")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(5);

        if (postsError) {
          return { error: { message: postsError.message } };
        }

        return { data: posts };
      },
      providesTags: ["Latest"],
    }),
  }),
});

// Export hooks for the queries and mutations
export const {
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useGetPostsByCategoryQuery,
  useGetPostByIdQuery,
  useGetPostByTitleQuery,
  useGetRelatedPostsQuery,
  useGetLatestPostsQuery,
} = apiSlice;

export default apiSlice;
