// File: Pagination.js
// This component provides navigation controls for paginated content, allowing users to switch between pages.

import React from "react";
import Layout from "./Layout";

// Functional component to handle pagination controls
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  // Handler for the 'Previous' button click
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // Handler for the 'Next' button click
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Handler for clicking on a specific page number
  const handlePageClick = (page) => {
    onPageChange(page);
  };

  return (
    <Layout className="flex justify-center items-center space-x-2 my-4">
      {/* Button to navigate to the previous page */}
      <button
        className="px-3 py-1 text-sm font-semibold text-secondary border"
        onClick={handlePrevious}
        disabled={currentPage === 1} // Disable button if on the first page
      >
        Prev
      </button>

      {/* Render page number buttons */}
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`h-8 w-10 py-1 text-sm font-semibold border ${
              currentPage === page
                ? "bg-primary text-blue-500" // Highlight current page
                : "text-secondary hover:bg-blue-500 duration-100 hover:text-white"
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Button to navigate to the next page */}
      <button
        className="px-3 py-1 text-sm font-semibold text-secondary border"
        onClick={handleNext}
        disabled={currentPage === totalPages} // Disable button if on the last page
      >
        Next
      </button>
    </Layout>
  );
}
