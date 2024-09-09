// File: SignIn.js
// This component renders a form for users to sign in. It handles email and password inputs, and
// uses the signIn mutation to authenticate the user. If sign-in is successful, the user is redirected to the homepage.

import React, { useState } from "react";
import { useSignInMutation } from "../../features/auth/authApi";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  // useSignInMutation is an API hook that handles the sign-in process.
  // It returns the signIn function, a loading state (isLoading), and an error object if sign-in fails.
  const [signIn, { isLoading, error }] = useSignInMutation();

  // useState hooks to manage input field values for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useNavigate hook to programmatically navigate the user to different routes
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSignIn = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      // Call the signIn mutation with email and password
      await signIn({ email, password }).unwrap();

      // On success, navigate the user to the homepage
      navigate("/", { replace: true });
    } catch (err) {
      // Log any errors if sign-in fails
      console.error("Failed to sign in:", err);
    }
  };

  return (
    <form
      onSubmit={handleSignIn}
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

      {/* Sign-in button with loading state */}
      <button
        type="submit"
        disabled={isLoading} // Disable button when loading
        className={`w-full px-4 py-2 bg-blue-500 text-white font-semibold transition-colors duration-300 
        ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
      >
        {isLoading ? "Signing In..." : "Sign In"}
      </button>

      {/* Error message displayed if sign-in fails */}
      {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
    </form>
  );
};

export default SignIn;
