// File: MiniPost.js
// This component displays a mini post preview with a thumbnail, title, and creation date.
// It uses the Image component to render the post's thumbnail and provides a link to the full post.

import React from "react";
import Image from "../ui/Image"; // Component for displaying images
import { Link } from "react-router-dom"; // Link component for navigation

export default function MiniPost({ post }) {
  const { title, thumbnail, created_at } = post; // Destructure post properties
  const date = created_at.slice(0, 10); // Extract the date part from the created_at timestamp

  return (
    <div className="grid grid-cols-[90px_auto] gap-4">
      {/* Display the post's thumbnail */}
      <Image src={thumbnail} className="w-20 aspect-[3/2]" />

      <div className="space-y-2">
        {/* Link to the full post */}
        <Link to={`/news/${title}`}>
          <h2 className="text-secondary hover:text-blue-500 duration-100 text-lg font-semibold leading-[1rem] line-clamp-1">
            {title}
          </h2>
        </Link>
        {/* Display the post's creation date */}
        <p className="text-sm">{date}</p>
      </div>
    </div>
  );
}
