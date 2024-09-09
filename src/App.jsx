// File: src/App.js
// Description: This component sets up the main application routing using React Router. It includes the navigation bar and footer
// on all pages, handles authentication state management with Supabase, and ensures that scroll position is preserved on navigation.

import React, { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import Navbar from "./components/Navigation/Navbar";
import Homepage from "./pages/Homepage";
import Footer from "./components/Navigation/Footer";
import Singlepage from "./pages/Singlepage";
import Categorypage from "./pages/Categorypage";
import { useDispatch } from "react-redux";
import supabase from "./configs/supabase";
import { clearUser, setUser } from "./features/auth/authSlice";
import Authpage from "./pages/Authpage";
import Addnews from "./pages/Addnews";
import Editpage from "./pages/Editpage";
import Searchpage from "./pages/Searchpage";
import Errorpage from "./pages/Errorpage";

// Create a router configuration with routes and corresponding elements
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar /> <Homepage /> <Footer />
      </>
    ),
  },
  {
    path: "/news",
    element: (
      <>
        <Navbar /> <Homepage /> <Footer />
      </>
    ),
  },
  {
    path: "/authentication",
    element: (
      <>
        <Navbar /> <Authpage /> <Footer />
      </>
    ),
  },
  {
    path: "/add",
    element: (
      <>
        <Navbar /> <Addnews /> <Footer />
      </>
    ),
  },
  {
    path: "/search",
    element: (
      <>
        <Navbar /> <Searchpage /> <Footer />
      </>
    ),
  },
  {
    path: "/news/:title",
    element: (
      <>
        <Navbar /> <Singlepage /> <Footer />
      </>
    ),
  },
  {
    path: "/news/:id/edit",
    element: (
      <>
        <Navbar /> <Editpage /> <Footer />
      </>
    ),
  },
  {
    path: "/category/:category",
    element: (
      <>
        <Navbar /> <Categorypage /> <Footer />
      </>
    ),
  },
  {
    path: "/*",
    element: (
      <>
        <Navbar /> <Errorpage /> <Footer />
      </>
    ),
  },
]);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserAndSession = async () => {
      // Fetch initial user and session from Supabase
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (user) {
        dispatch(setUser({ user, session }));
      }

      // Listen for authentication state changes
      const { data: authListener } = supabase.auth.onAuthStateChange(
        (event, session) => {
          if (event === "SIGNED_IN") {
            dispatch(setUser({ user: session.user, session }));
          } else if (event === "SIGNED_OUT") {
            dispatch(clearUser());
          }
        }
      );

      // Cleanup auth listener on component unmount
      return () => {
        authListener.subscription.unsubscribe();
      };
    };

    getUserAndSession();
  }, [dispatch]);

  return (
    <RouterProvider router={router}>
      <ScrollRestoration /> {/* Ensures scroll position is preserved */}
    </RouterProvider>
  );
};

export default App;
