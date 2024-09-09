// File: Hero.js
// This component is responsible for displaying a featured post and a list of the latest posts.
// It fetches the latest posts from the API and handles loading, error, and display states.

import React from "react";
import Layout from "../ui/Layout"; // Layout component to wrap the content
import NewsCard from "../Cards/NewsCard"; // Component for displaying individual news cards
import FeaturedCard from "../Cards/FeaturedCard"; // Component for displaying a featured post card
import Loading from "../ui/Loading"; // Loading spinner component
import { useGetLatestPostsQuery } from "../../features/api/apiSlice"; // RTK Query hook for fetching the latest posts

export default function Hero() {
  // Fetch latest posts using the useGetLatestPostsQuery hook
  // data: latestPosts contains the fetched posts
  // isLoading tells if the data is still being fetched
  // error holds any errors encountered during the fetch
  // isError is a boolean indicating if there was an error
  const {
    data: latestPosts,
    isLoading,
    error,
    isError,
  } = useGetLatestPostsQuery() || []; // Default to an empty array if no data

  // Destructure the first item from the array and store the rest separately
  const [firstItem, ...remainingItems] = latestPosts || [];

  // Variable to hold the content to be rendered
  let content = null;

  // Determine the content based on the state of data fetching
  if (isLoading) {
    // Display a loading indicator while fetching data
    content = <Loading />;
  } else if (error) {
    // Display an error message if fetching fails
    content = (
      <div>
        <Layout>
          <h2>There was an error</h2>
        </Layout>
      </div>
    );
  } else if (!isLoading && !isError && latestPosts.length > 0) {
    // If data is successfully fetched and there are posts to display
    content = (
      <div>
        <Layout>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* First column with 1 row for the featured post */}
            <div className="border p-4">
              <FeaturedCard postId={firstItem.id} />
            </div>

            {/* Second column with 2 rows for the remaining posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {remainingItems.map((post) => (
                <NewsCard key={post.id} postId={post.id} />
              ))}
            </div>
          </div>
        </Layout>
      </div>
    );
  }

  // Render the determined content
  return content;
}
