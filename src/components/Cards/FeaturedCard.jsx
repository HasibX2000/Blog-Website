// File: FeaturedCard.js
// This component is used to display a featured post card, showing its title, content excerpt, and thumbnail image.
// It fetches the post by its ID and handles loading and error states.

import React from "react";
import Image from "../ui/Image"; // Component to display images
import { Link } from "react-router-dom"; // To navigate between pages
import { useGetPostByIdQuery } from "../../features/api/apiSlice"; // RTK Query hook to fetch post by ID
import Loading from "../ui/Loading"; // Loading component to display while fetching data

export default function FeaturedCard({ postId }) {
  // Fetch post data using the useGetPostByIdQuery hook
  // data: post contains the fetched post details
  // error will hold any errors encountered during the fetch
  // isLoading tells if the fetch is in progress
  const { data: post, error, isLoading } = useGetPostByIdQuery(postId);

  // Show a loading indicator if the data is still being fetched
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

    return <p className="line-clamp-4 leading-6">{textContent}</p>;
  };

  return (
    <div className="space-y-3">
      {/* Link to the full news article using the post title as a parameter */}
      <Link to={`/news/${post.title}`}>
        {/* Display the post's thumbnail image */}
        <Image src={post.thumbnail} />
      </Link>

      <div className="">
        {/* Link to the full post page */}
        <Link to={`/news/${post.title}`}>
          {/* Display the post title with a hover effect */}
          <h2 className="text-xl font-bold text-secondary line-clamp-2 hover:text-blue-500 duration-150 hover:cursor-pointer ">
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
