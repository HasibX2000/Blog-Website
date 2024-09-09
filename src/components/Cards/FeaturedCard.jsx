import React from "react";
import Image from "../ui/Image";
import { Link } from "react-router-dom";
import { useGetPostByIdQuery } from "../../features/api/apiSlice";
import Loading from "../ui/Loading";

export default function FeaturedCard({ postId }) {
  const { data: post, error, isLoading } = useGetPostByIdQuery(postId);

  if (isLoading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>; // Ensure error.message is a string

  const TextExtractor = ({ htmlContent }) => {
    // Create a temporary div to hold the HTML content
    const div = document.createElement("div");
    div.innerHTML = htmlContent;

    // Extract text content from the temporary div
    const textContent = div.textContent || div.innerText || "";

    return <p className="line-clamp-4 leading-6">{textContent}</p>;
  };
  return (
    <div className="space-y-3">
      <Link to={`/news/${post.title}`}>
        <Image src={post.thumbnail} />
      </Link>
      <div className="">
        <Link to={`/news/${post.title}`}>
          <h2 className="text-xl font-bold text-secondary line-clamp-2 hover:text-blue-500 duration-150 hover:cursor-pointer ">
            {post.title}
          </h2>
        </Link>

        <TextExtractor htmlContent={post.content} />

        {post.featured && (
          <div className="bg-blue-500 text-white font-semibold px-2 py-1 inline-block absolute top-4 right-4">
            Featured
          </div>
        )}
      </div>
    </div>
  );
}
