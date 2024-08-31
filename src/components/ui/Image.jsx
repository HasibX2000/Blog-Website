import React from "react";

export default function Image({ src, alt, className }) {
  return (
    <img
      src={src}
      alt={alt || "title"}
      className={`w-full  object-cover aspect-[16/9] ${className}`}
    />
  );
}
