// src/components/SignOut.js
import React from "react";
import { useSignOutMutation } from "../../features/auth/authApi";

const SignOut = () => {
  const [signOut, { isLoading, error }] = useSignOutMutation();

  const handleSignOut = async () => {
    try {
      await signOut().unwrap();
      // Optionally, navigate or show success message
    } catch (err) {
      console.error("Failed to sign out:", err);
    }
  };

  return (
    <button onClick={handleSignOut} disabled={isLoading}>
      Sign Out
    </button>
  );
};

export default SignOut;
