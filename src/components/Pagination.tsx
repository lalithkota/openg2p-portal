"use client";

import clsx from "clsx";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (_page: number) => void;
}) {
  const generatePageNumbers = (currentPage: number, totalPages: number) => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };
  const pageNumbers = generatePageNumbers(currentPage, totalPages);

  const goToPage = (page: number) => {
    onPageChange(page);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    } else {
      goToPage(currentPage);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    } else {
      goToPage(currentPage);
    }
  };
  return (
    <div className="flex justify-center items-center space-x-2">
      <button
        onClick={goToPreviousPage}
        className="w-10 h-10 flex items-center justify-center rounded-lg text-sm"
        disabled={currentPage <= 1}
      >
        {"<"}
      </button>

      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => goToPage(pageNumber)}
          className={clsx("w-10 h-10 flex items-center justify-center rounded-lg text-sm mx-2", {
            "bg-blue-700 text-white": pageNumber === currentPage,
          })}
        >
          {pageNumber}
        </button>
      ))}

      <button
        onClick={goToNextPage}
        className="w-10 h-10 flex items-center justify-center rounded-lg text-sm"
        disabled={currentPage >= totalPages}
      >
        {">"}
      </button>
    </div>
  );
}
