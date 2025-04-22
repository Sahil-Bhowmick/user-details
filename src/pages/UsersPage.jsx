import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import { fetchAllUsers } from "../api/userApi";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("first_name");
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchAllUsers();
        setUsers(data);
      } catch (error) {
        console.error("Failed to load users", error);
      }
    };
    loadUsers();
  }, []);

  const filteredUsers = users.filter(
    ({ first_name, last_name }) =>
      first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      last_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const valA = a[sortKey];
    const valB = b[sortKey];
    return sortAsc ? (valA > valB ? 1 : -1) : valA < valB ? 1 : -1;
  });

  const currentUsers = sortedUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handleSort = (key) => {
    setSortAsc(key === sortKey ? !sortAsc : true);
    setSortKey(key);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 text-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Heading + Search */}
        <div className="flex flex-col items-start mb-3">
          <h1 className="text-3xl font-semibold mb-2">Users</h1>
          <div className="w-full max-w-lg pr-0 sm:pr-16">
            <SearchBar onSearch={setSearchTerm} />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg shadow-md bg-white">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 text-xs uppercase">
              <tr>
                {["first_name", "last_name", "age", "email", "web"].map(
                  (key) => (
                    <th
                      key={key}
                      onClick={() => handleSort(key)}
                      className="px-5 py-4 cursor-pointer whitespace-nowrap hover:bg-gray-200 transition-colors"
                    >
                      <div className="flex items-center gap-1 capitalize">
                        {key.replace("_", " ")}
                        {sortKey === key ? (
                          sortAsc ? (
                            <FaSortUp />
                          ) : (
                            <FaSortDown />
                          )
                        ) : (
                          <FaSort className="text-gray-400" />
                        )}
                      </div>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-[0.5px] border-gray-200 hover:bg-gray-50 transition-all"
                >
                  <td className="px-5 py-3 text-blue-600 font-medium hover:underline">
                    <Link to={`/users/${user.id}`}>{user.first_name}</Link>
                  </td>
                  <td className="px-5 py-3">{user.last_name}</td>
                  <td className="px-5 py-3">{user.age}</td>
                  <td className="px-5 py-3">{user.email}</td>
                  <td className="px-5 py-3">
                    <a
                      href={user.web}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {user.web}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-5 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredUsers.length / usersPerPage)}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
