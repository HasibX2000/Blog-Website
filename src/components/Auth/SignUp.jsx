import React, { useState, useEffect } from "react";
import { useSignUpMutation } from "../../features/auth/authApi";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [signUp, { isLoading, error }] = useSignUpMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [navigateAfterDelay, setNavigateAfterDelay] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (navigateAfterDelay) {
      const timer = setTimeout(() => {
        navigate("/", { replace: true });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [navigateAfterDelay, navigate]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }
    try {
      await signUp({ email, password }).unwrap();
      setSuccess(true);
      setNavigateAfterDelay(true); // Trigger navigation after delay
    } catch (err) {
      console.error("Failed to sign up:", err);
    }
  };

  return (
    <form
      onSubmit={handleSignUp}
      className="max-w-md mx-auto p-6 bg-white shadow-md"
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
          className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

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

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full px-4 py-2 bg-blue-500 text-white font-semibold transition-colors duration-300 
        ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
      >
        {isLoading ? "Signing Up..." : "Sign up"}
      </button>

      {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
      {success && !navigateAfterDelay && (
        <p className="mt-4 text-green-500 text-sm">
          Signup Success, Please verify email
        </p>
      )}
    </form>
  );
};

export default SignUp;
