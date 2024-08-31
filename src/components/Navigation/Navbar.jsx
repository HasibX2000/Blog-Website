import React, { useEffect, useState } from "react";
import Layout from "../ui/Layout";
import { Link } from "react-router-dom";
import SiteLogo from "../../assets/logo.png";

export default function Navbar() {
  const categories = [
    "Politics",
    "National",
    "International",
    "Business",
    "Science",
    "Health",
    "Entertainment",
    "Sports",
  ];

  const [dateTime, setDateTime] = useState({
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString({
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }),
  });

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
  return (
    <div className="bg-primary border-b sticky top-0 drop-shadow-sm">
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
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
        <div>
          <p className="text-secondary">
            <span className="font-semibold">Time:</span> {dateTime.time}
          </p>
          <p className="text-secondary">
            <span className="font-semibold">Date:</span> {dateTime.date}
          </p>
        </div>
      </Layout>
      <Layout className="flex justify-center items-center">
        <ul className="flex gap-5  overflow-auto md:overflow-hidden overflow-y-hidden">
          {categories.map((category) => (
            <li className="inline-block text-lg font-semibold text-secondary hover:text-blue-500 duration-150 hover:scale-110">
              <Link to={`/${category}`}>{category}</Link>
            </li>
          ))}
        </ul>
      </Layout>
    </div>
  );
}
