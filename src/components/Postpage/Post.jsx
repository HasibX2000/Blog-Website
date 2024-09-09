// File: Post.js
// This component displays a single post with its title, content, thumbnail, and creation date.
// It provides options to edit or delete the post if the user is logged in.

import React from "react";
import Image from "../ui/Image"; // Component for displaying images
import { useDeletePostMutation } from "../../features/api/apiSlice"; // Hook for deleting a post
import { Link, useNavigate } from "react-router-dom"; // Link component for navigation, useNavigate for redirect
import useAuth from "../../hooks/useAuth"; // Custom hook for checking user authentication
import { useGetUserQuery } from "../../features/auth/authApi";

export default function Post({ post }) {
  const { title, content, thumbnail, created_at, id } = post; // Destructure post properties
  const date = created_at.slice(0, 10); // Extract the date part from the created_at timestamp
  const navigate = useNavigate(); // Hook to programmatically navigate
  const [deletePost, { isLoading, isError, isSuccess, error }] =
    useDeletePostMutation(); // Hook for delete post mutation

  const { data: user } = useGetUserQuery();

  const isLoggedIn = useAuth(); // Check if the user is logged in

  // Handle post deletion
  const handleDelete = async () => {
    try {
      await deletePost(id).unwrap(); // Delete the post and unwrap the result
      navigate("/", { replace: true }); // Navigate to the homepage after successful deletion
    } catch (err) {
      console.error("Failed to delete post:", err.message); // Log error if deletion fails
    }
  };

  return (
    <div className="space-y-5">
      {/* Display the post title */}
      <h1 className="text-xl lg:text-4xl font-bold text-secondary">{title}</h1>

      {/* Display the post creation date */}
      <p>
        Created at : <span>{date}</span> By Admin
      </p>

      {/* Display edit and delete buttons if user is logged in and not loading */}
      {isLoggedIn && !isLoading && user?.email === "akonmhasib@gmail.com" && (
        <div className="space-x-3">
          {/* Link to edit the post */}
          <Link
            to={`/news/${id}/edit`}
            className="bg-blue-500 px-4 py-1 text-white hover:bg-blue-600"
          >
            Edit
          </Link>
          {/* Button to delete the post */}
          <button
            onClick={handleDelete}
            className="bg-red-500 px-4 py-1 text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      )}

      {/* Display the post thumbnail */}
      <Image src={thumbnail} />

      {/* Display the post content, with HTML rendered */}
      <div
        className="space-y-5 text-base text-secondary"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
