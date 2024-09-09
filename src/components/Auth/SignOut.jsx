// File: SignOut.js
// This component provides a button for users to sign out.
// It uses the signOut mutation from the authApi to handle the sign-out process.

import React from "react";
import { useSignOutMutation } from "../../features/auth/authApi";

const SignOut = () => {
  // useSignOutMutation is an API hook that provides the signOut function
  // isLoading indicates the loading state during sign-out
  // error holds any error encountered during the sign-out process
  const [signOut, { isLoading, error }] = useSignOutMutation();

  // Function to handle the sign-out process
  const handleSignOut = async () => {
    try {
      // Call the signOut mutation and unwrap the response
      await signOut().unwrap();

      // Optionally, navigate to a different page or show a success message
    } catch (err) {
      // Log any errors if sign-out fails
      console.error("Failed to sign out:", err);
    }
  };

  return (
    <button onClick={handleSignOut} disabled={isLoading}>
      {/* Display the button text and disable it while loading */}
      {isLoading ? "Signing Out..." : "Sign Out"}
    </button>
  );
};

export default SignOut;
