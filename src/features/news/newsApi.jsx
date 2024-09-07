import apiSlice from "../api/apiSlice";
import supabase from "../../configs/supabase";

const newsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPostsByCategory: builder.query({
      query: (categoryName) => ({ categoryName }),
      keepUnusedDataFor: 3600,
    }),
    getPostById: builder.query({
      query: (postId) => ({ postId }),
    }),
    getPostByTitle: builder.query({
      query: (postTitle) => ({ postTitle }),
      keepUnusedDataFor: 3600,
    }),
    getRelatedPosts: builder.query({
      query: (relatedPostId) => ({ relatedPostId }),
      keepUnusedDataFor: 3600,
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
      keepUnusedDataFor: 3600,
    }),
  }),
});

export const {
  useGetPostsByCategoryQuery,
  useGetPostByIdQuery,
  useGetPostByTitleQuery,
  useGetRelatedPostsQuery,
  useGetLatestPostsQuery,
} = newsApi;

export default newsApi;
