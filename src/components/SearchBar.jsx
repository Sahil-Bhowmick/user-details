import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  return (
    <div className="relative max-w-md mx-auto">
      <input
        type="text"
        placeholder="Search by first or last name..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full py-3 pl-10 pr-4 text-sm text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
      />
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
  );
};

export default SearchBar;
