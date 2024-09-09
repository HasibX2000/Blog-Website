// File: Layout.js
// This component provides a wrapper with consistent padding and centering for its children elements.

import React from "react";

// Functional component to wrap content with consistent styling
export default function Layout({ children, className }) {
  return (
    // Container class to center content with auto margin
    // Padding adjustments for different screen sizes
    // Any additional classes passed via `className` prop
    <div className={`container mx-auto px-1 md:px-0 py-4 ${className}`}>
      {children}
    </div>
  );
}
