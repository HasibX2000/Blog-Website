// File: NewsCard.js
// This component displays a summary of a news post, including the title, a short content excerpt, and a thumbnail image.
// It fetches the post by its ID and handles loading and error states.

import React from "react";
import Image from "../ui/Image"; // Component for displaying images
import { Link } from "react-router-dom"; // Link for navigation between routes
import { useGetPostByIdQuery } from "../../features/api/apiSlice"; // RTK Query hook for fetching a post by its ID
import Loading from "../ui/Loading"; // Loading spinner component

export default function NewsCard({ postId }) {
  // Fetch post data using the useGetPostByIdQuery hook
  // data: post contains the fetched post details
  // error holds any errors encountered during the fetch
  // isLoading is true when data is being fetched
  const { data: post, error, isLoading } = useGetPostByIdQuery(postId);

  // Show a loading indicator if data is still being fetched
  if (isLoading) return <Loading />;

  // Show an error message if the fetch fails
  if (error) return <p>Error: {error.message}</p>;

  // Function component to extract and display plain text from HTML content
  const TextExtractor = ({ htmlContent }) => {
    // Create a temporary div element to parse the HTML content
    const div = document.createElement("div");
    div.innerHTML = htmlContent;

    // Extract and return the text content
    const textContent = div.textContent || div.innerText || "";

    return <p className="line-clamp-1">{textContent}</p>; // Limit text to a single line
  };

  return (
    <div className="space-y-3 border p-4 relative">
      {/* Link to the full news article using the post title as a parameter */}
      <Link to={`/news/${post.title}`}>
        {/* Display the post's thumbnail image */}
        <Image src={post.thumbnail} />
      </Link>

      <div className="">
        {/* Link to the full post page */}
        <Link to={`/news/${post.title}`}>
          {/* Display the post title with a hover effect */}
          <h2 className="text-xl font-bold text-secondary line-clamp-2 hover:text-blue-500 duration-150 hover:cursor-pointer">
            {post.title}
          </h2>
        </Link>

        {/* Display an excerpt of the post's content (converted from HTML to plain text) */}
        <TextExtractor htmlContent={post.content} />

        {/* If the post is marked as featured, show a "Featured" label */}
        {post.featured && (
          <div className="bg-blue-500 text-white font-semibold px-2 py-1 inline-block absolute top-4 right-4">
            Featured
          </div>
        )}
      </div>
    </div>
  );
}
