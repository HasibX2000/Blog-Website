import React from "react";
import Image from "../ui/Image";
import { Link } from "react-router-dom";

export default function MiniPost({ post }) {
  const { title, thumbnail, created_at } = post;
  return (
    <div className="grid grid-cols-[90px_auto] gap-4">
      <Image src={thumbnail} className="w-20 aspect-[3/2]" />
      <div className="space-y-2">
        <Link to={`/news/${title}`}>
          <h2 className="text-secondary hover:text-blue-500 duration-100 text-lg font-semibold leading-[1rem] line-clamp-1">
            {title}
          </h2>
        </Link>
        <p className=" text-sm">{created_at}</p>
      </div>
    </div>
  );
}
