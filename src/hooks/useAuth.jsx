// File: src/hooks/useAuth.js
// This custom hook checks if the user is authenticated based on the session and user data in the Redux store.

import { useSelector } from "react-redux";

// Custom hook to determine if the user is authenticated
export default function useAuth() {
  // Access the authentication state from the Redux store
  const auth = useSelector((state) => state.auth);

  // Check if both session and user are present in the authentication state
  if (auth?.session && auth?.user) {
    return true; // User is authenticated
  } else {
    return false; // User is not authenticated
  }
}
