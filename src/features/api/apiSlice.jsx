import { createApi } from "@reduxjs/toolkit/query/react";
import supabase from "../../configs/supabase";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: async (args, api, extraOptions) => {
    const { categoryId, postId, categoryName, postTitle, relatedPostId } = args;

    let fetchFunction;

    // Determine which fetch function to use
    if (categoryId) {
      fetchFunction = async () => {
        const { data: postIdsData, error: postIdsError } = await supabase
          .from("post_categories")
          .select("post_id")
          .eq("category_id", categoryId);

        if (postIdsError) {
          throw new Error(postIdsError.message);
        }

        const postIds = postIdsData.map((item) => item.post_id);

        const { data: posts, error: postsError } = await supabase
          .from("posts")
          .select("*")
          .in("id", postIds);

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
    } else if (categoryName) {
      fetchFunction = async () => {
        const { data: categoryData, error: categoryError } = await supabase
          .from("categories")
          .select("id")
          .eq("name", categoryName)
          .single();

        if (categoryError) {
          throw new Error(categoryError.message);
        }

        return { categoryId: categoryData.id };
      };
    } else if (relatedPostId) {
      fetchFunction = async () => {
        // Step 1: Get the categories of the post with the given postId
        const { data: categoryData, error: categoryError } = await supabase
          .from("post_categories")
          .select("category_id")
          .eq("post_id", relatedPostId)
          .limit(1); // Only select the first category (if multiple)

        if (categoryError) {
          throw new Error(categoryError.message);
        }

        if (!categoryData || categoryData.length === 0) {
          throw new Error("No categories found for the post.");
        }

        const firstCategoryId = categoryData[0].category_id;

        // Step 2: Get the post IDs in that category
        const { data: postIdsData, error: postIdsError } = await supabase
          .from("post_categories")
          .select("post_id")
          .eq("category_id", firstCategoryId);

        if (postIdsError) {
          throw new Error(postIdsError.message);
        }

        const postIds = postIdsData.map((item) => item.post_id);

        // Step 3: Fetch all posts in that category excluding the current post
        const { data: relatedPosts, error: relatedPostsError } = await supabase
          .from("posts")
          .select("*")
          .in("id", postIds)
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
    // endpoints here
  }),
});

export const {} = apiSlice;

export default apiSlice;
