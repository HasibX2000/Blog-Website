import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navigation/Navbar";
import Homepage from "./pages/Homepage";
import Footer from "./components/Navigation/Footer";
import Singlepage from "./pages/Singlepage";
import Categorypage from "./pages/Categorypage";

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
    path: "/news/:title",
    element: (
      <>
        <Navbar /> <Singlepage /> <Footer />
      </>
    ),
  },
  {
    path: "/:category",
    element: (
      <>
        <Navbar /> <Categorypage /> <Footer />
      </>
    ),
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
