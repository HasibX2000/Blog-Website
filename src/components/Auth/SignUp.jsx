// File: SignUp.js
// This component renders a sign-up form that allows users to register with an email and password.
// After a successful sign-up, the user is shown a success message and automatically navigated to the homepage after a 5-second delay.

import React, { useState, useEffect } from "react";
import { useSignUpMutation } from "../../features/auth/authApi";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  // useSignUpMutation is an API hook for handling user registration.
  // It returns the signUp function, isLoading state during the request, and an error state if the sign-up fails.
  const [signUp, { isLoading, error }] = useSignUpMutation();

  // useState hooks to manage input values and form states
  const [email, setEmail] = useState(""); // Stores email input value
  const [password, setPassword] = useState(""); // Stores password input value
  const [confirmPassword, setConfirmPassword] = useState(""); // Stores confirm password value
  const [success, setSuccess] = useState(false); // Tracks if sign-up was successful
  const [navigateAfterDelay, setNavigateAfterDelay] = useState(false); // Controls post-sign-up navigation delay

  const navigate = useNavigate(); // useNavigate hook to redirect users

  // useEffect hook triggers navigation 5 seconds after a successful sign-up
  useEffect(() => {
    if (navigateAfterDelay) {
      const timer = setTimeout(() => {
        // Redirect the user to the homepage after 5 seconds
        navigate("/", { replace: true });
      }, 5000);

      // Clean up the timer on component unmount or when the delay is canceled
      return () => clearTimeout(timer);
    }
  }, [navigateAfterDelay, navigate]);

  // Function to handle form submission for sign-up
  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Ensure that password and confirm password match before proceeding
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    try {
      // Call the signUp mutation to register the user with email and password
      await signUp({ email, password }).unwrap();
      setSuccess(true); // Set the success state to true
      setNavigateAfterDelay(true); // Trigger navigation after delay
    } catch (err) {
      // Log any errors if sign-up fails
      console.error("Failed to sign up:", err);
    }
  };

  return (
    <form
      onSubmit={handleSignUp}
      className="max-w-md mx-auto p-6 bg-white shadow-md"
    >
      {/* Email input field */}
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-700 font-semibold mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Password input field */}
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-gray-700 font-semibold mb-2"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Confirm password input field */}
      <div className="mb-6">
        <label
          htmlFor="confirmPassword"
          className="block text-gray-700 font-semibold mb-2"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
          className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Submit button with loading state */}
      <button
        type="submit"
        disabled={isLoading} // Disable the button while the sign-up process is ongoing
        className={`w-full px-4 py-2 bg-blue-500 text-white font-semibold transition-colors duration-300 
        ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
      >
        {isLoading ? "Signing Up..." : "Sign up"}
      </button>

      {/* Display any error that occurred during sign-up */}
      {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}

      {/* Show a success message if the sign-up was successful */}
      {success && !navigateAfterDelay && (
        <p className="mt-4 text-green-500 text-sm">
          Signup Success, Please verify email
        </p>
      )}
    </form>
  );
};

export default SignUp;
