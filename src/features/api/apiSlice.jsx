import { createApi } from "@reduxjs/toolkit/query/react";
import supabase from "../../configs/supabase";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: async (args, api, extraOptions) => {
    const {
      newPost,
      deletePostId,
      categoryName,
      postId,
      postTitle,
      relatedPostId,
    } = args;

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

    let fetchFunction;

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
    } else if (postId) {
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
    } else if (postTitle) {
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
    } else if (relatedPostId) {
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
  tagTypes: ["Categories", "Related", "Latest", "Posts"],
  endpoints: (builder) => ({
    // Posts Endpoints
    createPost: builder.mutation({
      query: (newPost) => ({
        newPost,
      }),
      async onQueryStarted(newPost, { dispatch, queryFulfilled }) {
        try {
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
    deletePost: builder.mutation({
      query: (postId) => ({
        deletePostId: postId,
      }),
      invalidatesTags: ["Categories", "Related", "Latest"],
    }),

    // News Endpoints
    getPostsByCategory: builder.query({
      query: (categoryName) => ({ categoryName }),
      providesTags: ["Categories"],
    }),
    getPostById: builder.query({
      query: (postId) => ({ postId }),
      providesTags: ["Posts"],
    }),
    getPostByTitle: builder.query({
      query: (postTitle) => ({ postTitle }),
      providesTags: ["Posts"],
    }),
    getRelatedPosts: builder.query({
      query: (relatedPostId) => ({ relatedPostId }),
      providesTags: ["Related"],
    }),
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
      keepUnusedDataFor: 3600,
    }),
  }),
});

export const {
  useCreatePostMutation,
  useDeletePostMutation,
  useGetPostsByCategoryQuery,
  useGetPostByIdQuery,
  useGetPostByTitleQuery,
  useGetRelatedPostsQuery,
  useGetLatestPostsQuery,
} = apiSlice;

export default apiSlice;
