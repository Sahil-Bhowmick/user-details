import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageRange = 5;

  // Calculate the page numbers to display based on the current page
  const getPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.floor((currentPage - 1) / pageRange) * pageRange + 1;
    const endPage = Math.min(startPage + pageRange - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const visiblePages = getPageNumbers();

  return (
    <div className="flex justify-center space-x-2">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-200 disabled:opacity-50 transition-colors flex items-center"
      >
        <FaChevronLeft className="text-gray-600" />
      </button>

      {/* Page Number Buttons */}
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-md border border-gray-300 text-sm ${
            currentPage === page
              ? "bg-gray-800 text-white"
              : "text-gray-600 hover:bg-gray-100"
          } transition-colors`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-200 disabled:opacity-50 transition-colors flex items-center"
      >
        <FaChevronRight className="text-gray-600" />
      </button>
    </div>
  );
};

export default Pagination;
