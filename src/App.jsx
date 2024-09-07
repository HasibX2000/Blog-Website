import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
    path: "/news/:title",
    element: (
      <>
        <Navbar /> <Singlepage /> <Footer />
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
        <Navbar /> <h2>Error 404! Page not found</h2> <Footer />
      </>
    ),
  },
]);
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserAndSession = async () => {
      // Fetch initial user and session
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

      // Listen for auth state changes
      const { data: authListener } = supabase.auth.onAuthStateChange(
        (event, session) => {
          if (event === "SIGNED_IN") {
            dispatch(setUser({ user: session.user, session }));
          } else if (event === "SIGNED_OUT") {
            dispatch(clearUser());
          }
        }
      );

      // Cleanup listener on unmount
      return () => {
        authListener.subscription.unsubscribe();
      };
    };

    getUserAndSession();
  }, [dispatch]);

  return <RouterProvider router={router} />;
};

export default App;
