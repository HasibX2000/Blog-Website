// File: RelatedPost.js
// This component fetches and displays related posts based on a given post ID. It shows a loading state,
// an error message if the fetch fails, or a list of related posts if successful.

import React from "react";
import MiniPost from "./MiniPost"; // Component to display a single mini post
import { useGetRelatedPostsQuery } from "../../features/api/apiSlice"; // Hook for fetching related posts
import Layout from "../ui/Layout"; // Layout component for consistent styling
import Loading from "../ui/Loading"; // Component to display a loading spinner or message

export default function RelatedPost({ postId }) {
  // Use the query hook to fetch related posts based on postId
  const {
    data: relatedPosts, // Array of related posts
    isLoading, // Loading state
    error, // Error state
    isError, // Error flag
  } = useGetRelatedPostsQuery(postId) || []; // Fallback to an empty array if the query fails

  let content = null; // Variable to store the content to render

  // Check loading state and set the content to the Loading component
  if (isLoading) {
    content = <Loading />;
  }
  // Check error state and set the content to an error message
  else if (error) {
    content = (
      <div>
        <Layout className="bg-red-500">
          <h2 className="text-white px-4">No related post found!</h2>
          {console.log(error)} {/* Log error details to the console */}
        </Layout>
      </div>
    );
  }
  // If no error and not loading, display the related posts
  else if (!isLoading && !isError && relatedPosts.length > 0) {
    content = relatedPosts.map((post) => (
      <MiniPost key={post.id} post={post} />
    ));
  }

  return (
    <div>
      {/* Section header */}
      <div className="border-b border-b-secondary mb-5">
        <h2 className="bg-secondary text-xl font-semibold text-white px-3 py-1 inline-block">
          Related Posts
        </h2>
      </div>

      {/* Render the content */}
      <div className="space-y-3">{content}</div>
    </div>
  );
}
