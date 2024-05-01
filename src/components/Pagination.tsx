"use client";

import clsx from "clsx";
import {useMemo} from "react";

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
    const maxVisiblePages = 4; // Adjust as needed

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const pageNumbers = [];
    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) {
        pageNumbers.push("...");
      }
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }
      pageNumbers.push(totalPages);
    }
    return pageNumbers;
  };

  const pageNumbers = useMemo(() => generatePageNumbers(currentPage, totalPages), [currentPage, totalPages]);

  const goToPage = (page: number) => {
    onPageChange(page);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  return (
    <div
      className="flex items-center justify-center space-x-2"
      style={{marginBottom: "10px", fontSize: "0.85rem"}}
    >
      <button
        onClick={goToPreviousPage}
        className={clsx("w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-600", {
          "cursor-pointer": currentPage > 1,
          "opacity-50 cursor-not-allowed": currentPage <= 1,
        })}
        disabled={currentPage <= 1}
      >
        {"<"}
      </button>

      {pageNumbers.map((pageNumber, index) => (
        <button
          key={index}
          onClick={() => {
            if (typeof pageNumber === "number") {
              goToPage(pageNumber);
            }
          }}
          className={clsx(
            "w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 ",
            {
              " rounded-lg bg-blue-500 text-white": pageNumber === currentPage,
              "opacity-50 cursor-not-allowed": typeof pageNumber === "string", // Disable click for ellipses
            }
          )}
          style={{padding: "0.15rem"}}
        >
          {pageNumber}
        </button>
      ))}

      <button
        onClick={goToNextPage}
        className={clsx("w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-600", {
          "cursor-pointer": currentPage < totalPages,
          "opacity-50 cursor-not-allowed": currentPage >= totalPages,
        })}
        disabled={currentPage >= totalPages}
      >
        {">"}
      </button>
    </div>
  );
}
