// File: CurrentUser.js
// This component displays the current user's status. It shows their email when logged in,
// and provides options to add news or log out. If the user is not logged in, a login button is displayed.

import React from "react";
import {
  useGetUserQuery,
  useSignOutMutation,
} from "../../features/auth/authApi";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const CurrentUser = () => {
  // Fetch the current user's data and authentication status
  const { data: user, error, isLoading } = useGetUserQuery();

  // Define the signOut mutation to handle logging out
  const [signout, { isLoading: sLoading, isError }] = useSignOutMutation();

  // Custom hook to check if the user is logged in
  const isLoggedIn = useAuth();

  // Navigate function to redirect the user after logging out
  const navigate = useNavigate();

  // If the user data is still loading, display a loading message
  if (isLoading) return <p>Loading...</p>;

  // Function to handle the logout process
  const handleLogout = async () => {
    try {
      // Perform the signOut mutation and navigate to the home page
      await signout();
      navigate("/", { replace: true });
    } catch (err) {
      // Log any errors encountered during the logout process
      console.error("Logout failed: ", err);
    }
  };

  return (
    <div>
      {/* Show user details and logout option if logged in, else show login link */}
      {!isLoading && isLoggedIn ? (
        <div className="flex items-center gap-5">
          {/* Greet the logged-in user */}
          <p>Hello {user?.email}</p>

          {/* Link to add news page */}
          <Link to="/add" className="bg-blue-500 text-white px-4 py-1">
            Add News
          </Link>

          {/* Logout button with conditional styling and loading state */}
          <button
            onClick={handleLogout}
            className={`bg-blue-500 text-white px-4 py-1 ${
              sLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
            disabled={sLoading}
          >
            {sLoading ? "Logging out..." : "Logout"}
          </button>

          {/* Show error message if logout fails */}
          {isError && (
            <p className="text-red-500 mt-2">Logout failed. Try again.</p>
          )}
        </div>
      ) : (
        // Show login link if not logged in
        <Link
          to="/authentication"
          className="bg-blue-500 px-4 py-1 text-white hover:bg-blue-600"
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default CurrentUser;
