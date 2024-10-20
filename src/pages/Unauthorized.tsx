import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Unauthorized Access
          </h2>
          <div className="mt-2 text-center text-sm text-gray-600">
            <p>
              Oops! It looks like you don't have permission to access this page.
            </p>
          </div>
        </div>
        <div className="mt-8 space-y-6">
          <div className="flex items-center justify-center">
            <svg
              className="h-24 w-24 text-red-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              <circle cx="12" cy="16" r="1"></circle>
            </svg>
          </div>
          <div className="text-center">
            <p className="text-gray-500">
              If you believe this is an error, please contact the administrator
              or try logging in again.
            </p>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <Link
              to="/login"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Log In
            </Link>
            <div
              onClick={() => {
                document.cookie.split(";").forEach(function (c) {
                  document.cookie = c
                    .replace(/^ +/, "")
                    .replace(
                      /=.*/,
                      "=;expires=" + new Date().toUTCString() + ";path=/"
                    );
                });
                navigate("/login");
              }}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
            >
              Log Out
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
