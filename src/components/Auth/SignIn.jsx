// src/components/SignIn.js
import React, { useState } from "react";
import { useSignInMutation } from "../../features/auth/authApi";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [signIn, { isLoading, error }] = useSignInMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signIn({ email, password }).unwrap();
      navigate("/", { replace: true });
      // Optionally, navigate or show success message
    } catch (err) {
      console.error("Failed to sign in:", err);
    }
  };

  return (
    <form
      onSubmit={handleSignIn}
      className="max-w-md mx-auto p-6 bg-white  shadow-md"
    >
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
          className="w-full px-4 py-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

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
          className="w-full px-4 py-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full px-4 py-2 bg-blue-500 text-white font-semibold  transition-colors duration-300 
        ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
      >
        {isLoading ? "Signing In..." : "Sign In"}
      </button>

      {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
    </form>
  );
};

export default SignIn;
