import { createApi } from "@reduxjs/toolkit/query/react";
import supabase from "../../configs/supabase";

// Define constants for local storage key and cache duration
const LOCAL_STORAGE_KEY = "postsApiData";
const CACHE_DURATION_MS = 60 * 60 * 1000; // 1 hour in milliseconds

function saveToLocalStorage(key, data) {
  const timestamp = new Date().getTime();
  localStorage.setItem(key, JSON.stringify({ timestamp, data }));
}

function getFromLocalStorage(key) {
  const cachedData = localStorage.getItem(key);
  if (cachedData) {
    const { timestamp, data } = JSON.parse(cachedData);
    if (new Date().getTime() - timestamp < CACHE_DURATION_MS) {
      return data;
    }
  }
  return null;
}

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: async (args, api, extraOptions) => {
    const { categoryId, postId, categoryName, postTitle } = args;

    let cacheKey = "";
    let fetchFunction;

    // Determine which cache key and fetch function to use
    if (categoryId) {
      cacheKey = `postsByCategory-${categoryId}`;
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
      cacheKey = `postById-${postId}`;
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
      cacheKey = `postByTitle-${postTitle}`;
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
      cacheKey = `categoryIdByName-${categoryName}`;
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
    } else {
      return { error: { message: "No valid ID, title, or name provided" } };
    }

    // Try to get data from local storage
    const cachedData = getFromLocalStorage(cacheKey);
    if (cachedData) {
      return { data: cachedData };
    }

    // Fetch new data and save to local storage
    try {
      const data = await fetchFunction();
      saveToLocalStorage(cacheKey, data);
      return { data };
    } catch (error) {
      return { error: { message: error.message } };
    }
  },
  endpoints: (builder) => ({
    getPostsByCategory: builder.query({
      query: (categoryId) => ({ categoryId }),
    }),
    getPostById: builder.query({
      query: (postId) => ({ postId }),
    }),
    getCategoryId: builder.query({
      query: (categoryName) => ({ categoryName }),
    }),
    getPostByTitle: builder.query({
      query: (postTitle) => ({ postTitle }),
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
    }),
  }),
});

export const {
  useGetPostsByCategoryQuery,
  useGetPostByIdQuery,
  useGetCategoryIdQuery,
  useGetPostByTitleQuery,
  useGetLatestPostsQuery,
} = postsApi;

export default postsApi;
