import React from "react";
import Layout from "../ui/Layout";
import SiteLogo from "../../assets/logo.png";
import PlayStore from "../../assets/playstore.webp";
import SocialMenu from "../ui/SocialMenu";
import { Link } from "react-router-dom";

export default function Footer() {
  const popular = ["National", "International", "Sports", "Health", "Science"];
  const important = [
    "About Us",
    "Contact Us",
    "Privacy Policy",
    "Terms & Condition",
  ];
  return (
    <div className="bg-secondary py-10">
      <Layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-14 px-5 sm:px-0">
        <div className="space-y-5">
          <img src={SiteLogo} alt="SiteLogo" className="h-8" />
          <p className="text-primary text-base">
            <span className="font-semibold text-lg">Metro News Online</span>,
            Skyline Building (Suite 800), <br /> 1234 5th Avenue, New York, NY
            10001 <br />
            Telephone: +1 (212) 555-1234 up to 6
          </p>
          <SocialMenu />
        </div>
        <div>
          <h2 className="text-primary font-semibold mb-3 text-xl">
            Most Popular
          </h2>
          <ul className="space-y-1 ">
            {popular.map((item) => (
              <li
                className="text-primary hover:text-blue-400 duration-100"
                key={item}
              >
                <Link to={item}>{item}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-primary  font-semibold mb-3 text-xl">
            Important Links
          </h2>
          <ul className="space-y-1 ">
            {important.map((item) => (
              <li
                className="text-primary hover:text-blue-400 duration-100"
                key={item}
              >
                <Link to={item}>{item}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-primary  font-semibold mb-3 text-xl">
            Download Our Android App
          </h2>
          <p className="text-primary text-base">
            Find out more about our Metro News Online: Latest News,
            Infotainment, Online & Live TV
          </p>
          <Link>
            <img src={PlayStore} alt="PlayStore" className="h-20" />
          </Link>
        </div>
      </Layout>
    </div>
  );
}
