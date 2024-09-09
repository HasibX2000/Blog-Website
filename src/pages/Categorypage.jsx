// File: src/pages/CategoryPage.js
// This component displays a list of posts filtered by category and supports pagination.

import React, { useState } from "react";
import Layout from "../components/ui/Layout";
import NewsCard from "../components/Cards/NewsCard";
import Pagination from "../components/ui/Pagination";
import { useParams } from "react-router-dom";
import Loading from "../components/ui/Loading";
import { useGetPostsByCategoryQuery } from "../features/api/apiSlice";

// Functional component to render posts by category with pagination
export default function CategoryPage() {
  // Extract category from URL parameters using useParams
  const { category } = useParams();

  // State to keep track of the current page for pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Number of posts to display per page
  const postsPerPage = 12;

  // Fetch posts by category using the query from apiSlice
  const {
    data: postsData,
    error: postsError,
    isLoading: isPostsLoading,
  } = useGetPostsByCategoryQuery(category);

  // Show a loading spinner while data is being fetched
  if (isPostsLoading) {
    return <Loading />;
  }

  // Show an error message if there was an error fetching posts
  if (postsError) {
    return (
      <Layout className="flex justify-center items-center py-32">
        <h2>Error: {postsError.message}</h2> {/* Display the error message */}
      </Layout>
    );
  }

  // Pagination calculation
  const totalPosts = postsData?.length || 0; // Total number of posts
  const totalPages = Math.ceil(totalPosts / postsPerPage); // Calculate total pages

  // Slice the posts array to get posts for the current page
  const startIndex = (currentPage - 1) * postsPerPage; // Calculate starting index
  const currentPosts =
    postsData?.slice(startIndex, startIndex + postsPerPage) || []; // Get posts for the current page

  return (
    <div>
      {/* Display posts if there are any */}
      {currentPosts.length > 0 && (
        <Layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Render a NewsCard for each post */}
          {currentPosts.map((post) => (
            <NewsCard key={post.id} postId={post.id} /> // Pass postId to NewsCard
          ))}
        </Layout>
      )}

      {/* Display a message if no posts are found */}
      {currentPosts.length === 0 && (
        <Layout className="flex justify-center items-center py-32">
          <h2>No Posts Found</h2> {/* Display a no posts message */}
        </Layout>
      )}

      {/* Display pagination controls if there are posts */}
      {currentPosts.length > 0 && (
        <Pagination
          currentPage={currentPage} // Pass current page to Pagination
          totalPages={totalPages} // Pass total pages to Pagination
          onPageChange={setCurrentPage} // Function to update current page
        />
      )}
    </div>
  );
}
