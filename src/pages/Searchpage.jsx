// File: src/pages/Searchpage.js
// This component handles displaying search results, including pagination and handling loading/error states.

import React, { useState } from "react";
import Layout from "../components/ui/Layout";
import NewsCard from "../components/Cards/NewsCard";
import Pagination from "../components/ui/Pagination";
import { useLocation } from "react-router-dom";
import Loading from "../components/ui/Loading";
import { useSearchPostsQuery } from "../features/api/apiSlice"; // Query hook for fetching search results
import ErrorImage from "../assets/error.png";

export default function Searchpage() {
  const location = useLocation(); // Hook to get the current location
  const searchParams = new URLSearchParams(location.search); // Create URLSearchParams object to parse query parameters
  const query = searchParams.get("query"); // Get the 'query' parameter from the URL
  const [currentPage, setCurrentPage] = useState(1); // State to manage the current page number
  const postsPerPage = 12; // Number of posts per page

  // Fetch posts based on the search query
  const {
    data: postsData,
    error: postsError,
    isLoading: isPostsLoading,
  } = useSearchPostsQuery(query); // Custom hook to fetch posts for the given search query

  // Display a loading spinner while posts are being fetched
  if (isPostsLoading) {
    return <Loading />;
  }

  // Display an error message if there was an error fetching posts
  if (postsError) {
    return (
      <Layout className="flex justify-center items-center py-32">
        <h2>Error: {postsError.message}</h2> {/* Display error message */}
      </Layout>
    );
  }

  // Calculate pagination details
  const totalPosts = postsData?.length || 0; // Total number of posts
  const totalPages = Math.ceil(totalPosts / postsPerPage); // Total number of pages

  // Calculate the start index for slicing posts for the current page
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts =
    postsData?.slice(startIndex, startIndex + postsPerPage) || []; // Slice posts for the current page

  return (
    <div>
      {/* Render posts if there are any */}
      {currentPosts.length > 0 && (
        <Layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {currentPosts.map((post) => (
            // Render individual NewsCard for each post
            <NewsCard key={post.id} postId={post.id} />
          ))}
        </Layout>
      )}

      {/* Display message if no posts are found */}
      {currentPosts.length === 0 && (
        <Layout className="flex justify-center items-center py-32 flex-col">
          <h2 className="text-3xl font-semibold text-red-500">
            No Results Found for "{query}"
          </h2>{" "}
          {/* Display no results message */}
          <img src={ErrorImage} alt="Error" className="w-1/3" />
        </Layout>
      )}

      {/* Render pagination if there are posts */}
      {currentPosts.length > 0 && (
        <Pagination
          currentPage={currentPage} // Current page number
          totalPages={totalPages} // Total number of pages
          onPageChange={setCurrentPage} // Function to handle page changes
        />
      )}
    </div>
  );
}
