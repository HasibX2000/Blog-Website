import { createApi } from "@reduxjs/toolkit/query/react";
import supabase from "../../configs/supabase";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: async (args, api, extraOptions) => {
    const { categoryName, postId, postTitle, relatedPostId } = args;

    let fetchFunction;

    // Determine which fetch function to use
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
        // Step 1: Get the category of the post with the given postId
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

        // Step 2: Get related posts in the same category
        const { data: relatedPosts, error: relatedPostsError } = await supabase
          .from("posts")
          .select("*")
          .eq("category", category)
          .neq("id", relatedPostId) // Exclude the current post
          .limit(5); // Limit to 5 related posts

        if (relatedPostsError) {
          throw new Error(relatedPostsError.message);
        }

        return relatedPosts;
      };
    } else {
      return { error: { message: "No valid ID, title, or name provided" } };
    }

    // Fetch new data
    try {
      const data = await fetchFunction();
      return { data };
    } catch (error) {
      return { error: { message: error.message } };
    }
  },
  tagTypes: ["User", "Posts"], // Define your tag types here
  endpoints: (builder) => ({
    // Define your endpoints here
  }),
});

export const {} = apiSlice;

export default apiSlice;
