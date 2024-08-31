import React from "react";

export default function Layout({ children, className }) {
  return (
    <div className={`container mx-auto px-1 md:px-0 py-4 ${className}`}>
      {children}
    </div>
  );
}
