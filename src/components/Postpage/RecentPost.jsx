// File: RecentPost.js
// This component fetches and displays the latest posts. It shows a loading message,
// an error message if the fetch fails, or the list of latest posts if successful.

import React from "react";
import MiniPost from "./MiniPost"; // Component to display a single mini post
import { useGetLatestPostsQuery } from "../../features/api/apiSlice"; // Hook for fetching latest posts
import Layout from "../ui/Layout"; // Layout component for consistent styling

export default function RecentPost() {
  // Use the query hook to fetch latest posts
  const {
    data: latestPosts, // Array of latest posts
    isLoading, // Loading state
    error, // Error state
    isError, // Error flag
  } = useGetLatestPostsQuery() || []; // Fallback to an empty array if the query fails

  let content = null; // Variable to store the content to render

  // Check loading state and set the content to a loading message
  if (isLoading) {
    content = (
      <div>
        <Layout>
          <h2>Loading...</h2>
        </Layout>
      </div>
    );
  }
  // Check error state and set the content to an error message
  else if (error) {
    content = (
      <div>
        <Layout>
          <h2>There was an error</h2>
        </Layout>
      </div>
    );
  }
  // If no error and not loading, display the latest posts
  else if (!isLoading && !isError && latestPosts.length > 0) {
    content = latestPosts.map((post) => <MiniPost key={post.id} post={post} />);
  }

  return (
    <div>
      {/* Section header */}
      <div className="border-b border-b-secondary mb-5">
        <h2 className="bg-secondary text-xl font-semibold text-white px-3 py-1 inline-block">
          Recent Posts
        </h2>
      </div>

      {/* Render the content */}
      <div className="space-y-3">{content}</div>
    </div>
  );
}
