import React, { useEffect, useState } from "react";
import Layout from "../ui/Layout";
import { Link, useLocation } from "react-router-dom";
import SiteLogo from "../../assets/logo.png";
import Clock from "../../assets/clock.svg";
import Calendar from "../../assets/calendar.svg";
import CurrentUser from "../Auth/CurrentUser";

export default function Navbar() {
  const location = useLocation();
  const categories = [
    {
      categoryName: "Politics",
      categoryId: "d5f6a7b8-9c0d-1e2f-3a4b-5c6d7e8f9a0b",
    },
    {
      categoryName: "National",
      categoryId: "550e8400-e29b-41d4-a716-446655440000",
    },
    {
      categoryName: "International",
      categoryId: "d0b7dbae-dc1e-4a16-9f57-75ac0d3c5c6a",
    },
    {
      categoryName: "Business",
      categoryId: "3d9bd9f2-004d-4b4e-9f14-2f9d6eb8382c",
    },
    {
      categoryName: "Science",
      categoryId: "3b241101-e2bb-4255-8d17-dc09f4ca5e61",
    },
    {
      categoryName: "Health",
      categoryId: "e2a3f6c0-8421-4d0d-9f1d-6a2bb8e2cdad",
    },
    {
      categoryName: "Entertainment",
      categoryId: "c4e5f6a7-8b9c-0d1e-2f3a-4b5c6d7e8f9a",
    },
    {
      categoryName: "Sports",
      categoryId: "b2a3d4e5-6f7a-4b8c-9d0e-1f2a3b4c5d6e",
    },
  ];

  const [dateTime, setDateTime] = useState({
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString({
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }),
  });

  const [menuOpen, setMenuOpen] = useState(false);

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

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Check on initial load
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="bg-primary border-b sticky top-0 drop-shadow-sm z-50">
      <Layout className="flex justify-between items-center ">
        <Link to="/">
          <img src={SiteLogo} alt="SiteLogo" className="h-10" />
        </Link>

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
        <div className="space-y-1 hidden md:block">
          <p className="text-secondary flex items-center gap-2">
            <img src={Clock} alt="clock" /> {dateTime.time}
          </p>
          <p className="text-secondary flex items-center gap-2">
            <img src={Calendar} alt="Calendar" /> {dateTime.date}
          </p>
        </div>
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
      <div className="relative md:flex justify-center items-center ">
        {menuOpen && (
          <Layout className="py-custom">
            <ul className="absolute top-full left-0 right-0 border bg-white grid grid-cols-2 gap-2 p-3 px-5 md:hidden">
              {categories.map((item) => (
                <li
                  key={item.categoryId}
                  className="text-lg font-semibold text-secondary hover:text-blue-500 duration-150"
                >
                  <Link to={`/category/${item.categoryName}`}>
                    {item.categoryName}
                  </Link>
                </li>
              ))}
            </ul>
          </Layout>
        )}
        <ul className="hidden md:flex gap-5 overflow-auto md:overflow-hidden overflow-y-hidden mb-4">
          {categories.map((item) => (
            <li
              key={item.categoryId}
              className="inline-block text-lg font-semibold text-secondary hover:text-blue-500 duration-150 hover:scale-105"
            >
              <Link to={`/category/${item.categoryName}`}>
                {item.categoryName}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-center items-center mb-5">
        <CurrentUser />
      </div>
    </div>
  );
}
