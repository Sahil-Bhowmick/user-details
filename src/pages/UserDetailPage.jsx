import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { fetchUserById } from "../api/userApi";

const UserDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await fetchUserById(id);
        setUser(data);
      } catch (error) {
        console.error("Failed to load user data", error);
      }
    };

    getUser();
  }, [id]);

  if (!user) return <div className="p-6 text-center">Loading...</div>;

  const userDetails = [
    { label: "First Name", value: user.first_name },
    { label: "Last Name", value: user.last_name },
    { label: "Company Name", value: user.company_name },
    { label: "City", value: user.city },
    { label: "State", value: user.state },
    { label: "Zip", value: user.zip },
    { label: "Email", value: user.email },
    { label: "Web", value: user.web },
    { label: "Age", value: user.age },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-xl p-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center cursor-pointer text-blue-500 hover:text-blue-600 mb-4"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center sm:text-left">
          Details: {user.first_name} {user.last_name}
        </h2>
        <div className="space-y-4">
          {userDetails.map((detail, index) => (
            <div
              key={index}
              className="flex flex-row justify-start gap-16 items-center border-b border-gray-200 pb-2"
            >
              <span className="text-gray-600 font-medium">{detail.label}:</span>
              {detail.label === "Web" ? (
                <a
                  href={detail.value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-center"
                >
                  {detail.value}
                </a>
              ) : (
                <span className="text-gray-800 text-center font-semibold">
                  {detail.value}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;
