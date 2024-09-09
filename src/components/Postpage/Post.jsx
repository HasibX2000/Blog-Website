import React from "react";
import Image from "../ui/Image";
import { useDeletePostMutation } from "../../features/api/apiSlice";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Post({ post }) {
  const { title, content, thumbnail, created_at, id } = post;
  const date = created_at.slice(0, 10);
  const navigate = useNavigate();
  const [deletePost, { isLoading, isError, isSuccess, error }] =
    useDeletePostMutation();

  const isLoggedIn = useAuth();

  const handleDelete = async () => {
    try {
      await deletePost(id).unwrap();
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Failed to delete post:", err.message);
    }
  };
  return (
    <div className="space-y-5">
      <h1 className="text-xl lg:text-4xl font-bold text-secondary">{title}</h1>
      <p>
        Created at : <span>{date}</span> By Admin
      </p>
      {isLoggedIn && !isLoading && (
        <div className="space-x-3">
          <Link
            to={`/news/${title}/edit`}
            className="bg-blue-500 px-4 py-1 text-white hover:bg-blue-600"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-500 px-4 py-1 text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      )}
      <Image src={thumbnail} />
      <div
        className="space-y-5 text-base text-secondary"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
