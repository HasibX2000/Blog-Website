// File: Image.js
// This component renders an image element with optional custom styles and alternate text.

import React from "react";

// Functional component to render an image
export default function Image({ src, alt, className }) {
  return (
    <img
      src={src} // Source URL of the image
      alt={alt || "title"} // Alt text for the image; defaults to "title" if not provided
      className={`w-full object-cover aspect-[16/9] ${className}`} // Styles for the image, including full width, cover fit, and aspect ratio
    />
  );
}
