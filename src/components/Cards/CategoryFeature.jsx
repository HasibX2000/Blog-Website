// File: CategoryFeature.js
// This component is responsible for displaying a list of news posts for a specific category.
// It fetches posts from the backend using the category provided as a prop and displays them in a grid format.

import React from "react";
import NewsCard from "./NewsCard"; // Component to display individual news post cards
import Layout from "../ui/Layout"; // Layout component for wrapping the content
import { useGetPostsByCategoryQuery } from "../../features/api/apiSlice"; // RTK Query hook for fetching posts by category
import Loading from "../ui/Loading"; // Loading component to show while data is being fetched

export default function CategoryFeature({ category }) {
  // Destructure the result of the useGetPostsByCategoryQuery hook
  // data: postsData contains the fetched posts for the given category
  // error: postsError will hold any errors encountered during the fetch
  // isLoading: isPostsLoading tells if the fetch is still in progress
  const {
    data: postsData,
    error: postsError,
    isLoading: isPostsLoading,
  } = useGetPostsByCategoryQuery(category);

  // Show a loading spinner or indicator if the posts are still being fetched
  if (isPostsLoading) {
    return <Loading />;
  }

  // Display an error message if there was a problem fetching the posts
  if (postsError) {
    return (
      <Layout className="flex justify-center items-center py-32">
        <h2>Error: {postsError?.message || "An unexpected error occurred."}</h2>
      </Layout>
    );
  }

  // Render the posts if data is available and there are posts to display
  return (
    postsData.length > 0 && (
      <Layout>
        {/* Display the category name as a section heading */}
        <h2 className="bg-secondary px-5 py-1 text-primary font-semibold text-lg inline-block">
          {category}
        </h2>
        <hr />

        {/* Display the posts in a responsive grid layout */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {postsData.map((post) => (
            <NewsCard key={post.id} postId={post.id} />
          ))}
        </div>
      </Layout>
    )
  );
}
