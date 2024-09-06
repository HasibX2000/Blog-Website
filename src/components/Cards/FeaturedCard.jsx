import React from "react";
import Image from "../ui/Image";
import { Link } from "react-router-dom";
import { useGetPostByIdQuery } from "../../features/news/newsApi";
import Loading from "../ui/Loading";

export default function FeaturedCard() {
  const postId = "7e1c2f2e-3a4b-4b5d-8e1c-1f3a5b6c7d8e";
  const { data: post, error, isLoading } = useGetPostByIdQuery(postId);

  if (isLoading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>; // Ensure error.message is a string
  return (
    <div className="space-y-3">
      <Link to={`/news/${post.title}`}>
        <Image src={post.thumbnail} />
      </Link>
      <div className="">
        <Link to={`/news/${post.title}`}>
          <h2 className="text-xl font-bold text-secondary line-clamp-1 hover:text-blue-500 duration-150 hover:cursor-pointer ">
            {post.title}
          </h2>
        </Link>
        <p className="text-secondary text-base line-clamp-2 leading-7">
          {post.content}
        </p>
        {post.featured && (
          <div className="bg-blue-500 text-white font-semibold px-2 py-1 inline-block absolute top-4 right-4">
            Featured
          </div>
        )}
      </div>
    </div>
  );
}
