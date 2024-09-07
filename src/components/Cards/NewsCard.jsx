import React from "react";
import Image from "../ui/Image";
import { Link } from "react-router-dom";
import { useGetPostByIdQuery } from "../../features/news/newsApi";
import Loading from "../ui/Loading";

export default function NewsCard({ postId }) {
  const { data: post, error, isLoading } = useGetPostByIdQuery(postId);

  if (isLoading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>; // Ensure error.message is a string

  return (
    <div className="space-y-3 border p-4 relative">
      <Link to={`/news/${post.title}`}>
        <Image src={post.thumbnail} />
      </Link>
      <div className="">
        <Link to={`/news/${post.title}`}>
          <h2 className="text-xl font-bold text-secondary line-clamp-2 hover:text-blue-500 duration-150 hover:cursor-pointer ">
            {post.title}
          </h2>
        </Link>

        {post.featured && (
          <div className="bg-blue-500 text-white font-semibold px-2 py-1 inline-block absolute top-4 right-4">
            Featured
          </div>
        )}
      </div>
    </div>
  );
}
