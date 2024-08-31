import React from "react";
import Thumbnail from "../../assets/thumbnail.jpg";
import Image from "../ui/Image";

export default function MiniPost() {
  const date = new Date().toLocaleDateString();
  return (
    <div className="grid grid-cols-[90px_auto]">
      <Image src={Thumbnail} className="w-20 aspect-[3/2]" />
      <div className="space-y-1">
        <p className=" text-lg font-semibold leading-[1rem] line-clamp-1">
          Innovative Tech Startup Revolutionizes Remote Work with AI-Driven
          Solutions
        </p>
        <p className=" text-sm">{date}</p>
      </div>
    </div>
  );
}
