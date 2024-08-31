import React from "react";
import Thumbnail from "../../assets/thumbnail.jpg";
import Image from "../ui/Image";
import { Link } from "react-router-dom";

export default function MiniPost() {
  const date = new Date().toLocaleDateString();
  return (
    <div className="grid grid-cols-[90px_auto] gap-4">
      <Image src={Thumbnail} className="w-20 aspect-[3/2]" />
      <div className="space-y-2">
        <Link to="/news/title">
          <h2 className="text-secondary hover:text-blue-500 duration-100 text-lg font-semibold leading-[1rem] line-clamp-1">
            Innovative Tech Startup Revolutionizes Remote Work with AI-Driven
            Solutions
          </h2>
        </Link>
        <p className=" text-sm">{date}</p>
      </div>
    </div>
  );
}
