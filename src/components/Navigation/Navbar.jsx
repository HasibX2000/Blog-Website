// File: Navbar.js
// This component represents the navigation bar of the website. It includes site branding, search functionality,
// date and time display, a responsive menu, and user information.

import React, { useEffect, useState } from "react";
import Layout from "../ui/Layout"; // Layout component to structure the navbar
import { Link, useLocation } from "react-router-dom"; // Link component for navigation, useLocation for route info
import SiteLogo from "../../assets/logo.png"; // Path to the site logo image
import Clock from "../../assets/clock.svg"; // Path to the clock icon
import Calendar from "../../assets/calendar.svg"; // Path to the calendar icon
import CurrentUser from "../Auth/CurrentUser"; // Component to display current user info

export default function Navbar() {
  // Get the current location object to determine the current route
  const location = useLocation();

  // Array of category names for the navigation menu
  const categories = [
    "Science",
    "Business",
    "National",
    "Sports",
    "Entertainment",
    "International",
    "Politics",
    "Health",
  ];

  // State for storing the current date and time
  const [dateTime, setDateTime] = useState({
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString({
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }),
  });

  // State to control the mobile menu visibility
  const [menuOpen, setMenuOpen] = useState(false);

  // Update date and time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime({
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString({
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        }),
      });
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Handle window resize to close the mobile menu when the screen is resized to a larger size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Check initial window size on load
    handleResize();

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll to the top of the page when navigating to the homepage
  useEffect(() => {
    if (location.pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    setMenuOpen(false); // Close mobile menu on route change
  }, [location]);

  // Toggle mobile menu visibility
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="bg-primary border-b sticky top-0 drop-shadow-sm z-50">
      <Layout className="flex justify-between items-center">
        {/* Site logo with link to homepage */}
        <Link to="/">
          <img src={SiteLogo} alt="SiteLogo" className="h-10" />
        </Link>

        {/* Search form for larger screens */}
        <form className="w-1/4 hidden md:block">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block p-2 w-full ps-10 text-sm border focus:outline-none"
              placeholder="Search..."
              required
            />
          </div>
        </form>

        {/* Display date and time for larger screens */}
        <div className="space-y-1 hidden md:block">
          <p className="text-secondary flex items-center gap-2">
            <img src={Clock} alt="clock" /> {dateTime.time}
          </p>
          <p className="text-secondary flex items-center gap-2">
            <img src={Calendar} alt="Calendar" /> {dateTime.date}
          </p>
        </div>

        {/* Mobile menu button */}
        <button
          className="block md:hidden text-secondary focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </Layout>

      {/* Mobile menu items */}
      <div className="relative md:flex justify-center items-center">
        {menuOpen && (
          <Layout className="py-custom">
            <ul className="absolute top-full left-0 right-0 border bg-white grid grid-cols-2 gap-2 p-3 px-5 md:hidden">
              {categories.map((categoryName) => (
                <li
                  key={categoryName}
                  className="text-lg font-semibold text-secondary hover:text-blue-500 duration-150"
                >
                  <Link to={`/category/${categoryName}`}>{categoryName}</Link>
                </li>
              ))}
            </ul>
          </Layout>
        )}

        {/* Desktop menu items */}
        <ul className="hidden md:flex gap-5 overflow-auto md:overflow-hidden overflow-y-hidden mb-4">
          {categories.map((categoryName) => (
            <li
              key={categoryName}
              className="inline-block text-lg font-semibold text-secondary hover:text-blue-500 duration-150 hover:scale-105"
            >
              <Link to={`/category/${categoryName}`}>{categoryName}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Display current user information */}
      <div className="flex justify-center items-center mb-5">
        <CurrentUser />
      </div>
    </div>
  );
}
