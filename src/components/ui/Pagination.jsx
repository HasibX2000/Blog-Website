import React from "react";
import Layout from "./Layout";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  return (
    <Layout className="flex justify-center items-center space-x-2 my-4">
      <button
        className="px-3 py-1 text-sm font-semibold text-secondary border "
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`h-8 w-10 py-1 text-sm font-semibold border ${
              currentPage === page
                ? "bg-primary text-blue-500"
                : "text-secondary hover:bg-blue-500 duration-100 hover:text-white"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        className="px-3 py-1 text-sm font-semibold text-secondary border "
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </Layout>
  );
}
