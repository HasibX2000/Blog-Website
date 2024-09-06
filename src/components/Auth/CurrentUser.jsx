import React from "react";
import {
  useGetUserQuery,
  useSignOutMutation,
} from "../../features/auth/authApi";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const CurrentUser = () => {
  const { data: user, error, isLoading } = useGetUserQuery();
  const [signout, { isLoading: sLoading, isError }] = useSignOutMutation();
  const isLoggedIn = useAuth();
  const navigate = useNavigate();

  if (isLoading) return <p>Loading...</p>;

  const handleLogout = async () => {
    try {
      await signout();
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Logout failed: ", err);
    }
  };

  return (
    <div>
      {!isLoading && isLoggedIn ? (
        <div className="flex items-center gap-5">
          <p>Hello {user?.email}</p>
          <button
            onClick={handleLogout}
            className={`bg-blue-500 text-white px-4 py-1 ${
              sLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
            disabled={sLoading}
          >
            {sLoading ? "Logging out..." : "Logout"}
          </button>
          {isError && (
            <p className="text-red-500 mt-2">Logout failed. Try again.</p>
          )}
        </div>
      ) : (
        <Link
          to="authentication"
          className="bg-blue-500 px-4 py-1 text-white hover:bg-blue-600"
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default CurrentUser;
