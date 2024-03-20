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
    <div className="flex justify-center items-center space-x-4">
      <button onClick={goToPreviousPage}>
        <div className="h-5 w-5">
          <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path d="M8.5 4.5L5.5 7.5L8.5 10.5" stroke="#000000" strokeLinecap="square"></path>{" "}
            </g>
          </svg>
        </div>
      </button>

      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => goToPage(pageNumber)}
          className={clsx({
            "bg-blue-700 rounded-lg w-8 h-8 text-white": pageNumber === currentPage,
          })}
        >
          {pageNumber}
        </button>
      ))}
      <button onClick={goToNextPage}>
        <div className="h-5 w-5">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M10 7L15 12L10 17"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </g>
          </svg>
        </div>
      </button>
    </div>
  );
}
