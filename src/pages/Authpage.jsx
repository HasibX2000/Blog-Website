// File: src/pages/Authpage.js
// This component handles the authentication page, allowing users to either sign in or sign up.

import React, { useEffect, useState } from "react";
import Layout from "../components/ui/Layout";
import useAuth from "../hooks/useAuth";
import SignIn from "../components/Auth/SignIn";
import SignUp from "../components/Auth/SignUp";
import { useNavigate } from "react-router-dom";

// Functional component for the authentication page
export default function Authpage() {
  // State to toggle between Sign In and Sign Up views
  const [signin, setSignin] = useState(true);

  // Custom hook to determine if the user is logged in
  const isLoggedIn = useAuth();

  // Hook to programmatically navigate users
  const navigate = useNavigate();

  // Effect to redirect logged-in users to the home page
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/"); // Redirect to the home page
    }
  }, [isLoggedIn, navigate]); // Dependency array includes `isLoggedIn` and `navigate`

  return (
    <Layout>
      {/* Conditional rendering based on the `signin` state */}
      {signin ? (
        <>
          <SignIn /> {/* Render the SignIn component */}
          <p className="text-center my-5">
            {/* Text prompting users to switch to Sign Up */}
            Don't have an account?{" "}
            <span
              className="cursor-pointer font-semibold text-blue-500 underline"
              onClick={() => setSignin(!signin)} // Toggle `signin` state
            >
              Signup Here
            </span>
          </p>
        </>
      ) : (
        <>
          <SignUp /> {/* Render the SignUp component */}
          <p className="text-center my-5">
            {/* Text prompting users to switch to Sign In */}
            Already have an account?{" "}
            <span
              className="cursor-pointer font-semibold text-blue-500 underline"
              onClick={() => setSignin(!signin)} // Toggle `signin` state
            >
              Signin Here
            </span>
          </p>
        </>
      )}
    </Layout>
  );
}
