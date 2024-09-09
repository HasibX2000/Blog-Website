// File: SocialMenu.js
// This component renders a list of social media icons with links, used for social media navigation.

import React from "react";
import { Link } from "react-router-dom";
import FacebookIcon from "../../assets/icons/facebook.png"; // Facebook icon
import InstagramIcon from "../../assets/icons/instagram.png"; // Instagram icon
import TwitterIcon from "../../assets/icons/twitter.png"; // Twitter icon
import LinkedinIcon from "../../assets/icons/linkedin.png"; // LinkedIn icon
import YoutubeIcon from "../../assets/icons/youtube.png"; // YouTube icon

// Functional component to display social media links
export default function SocialMenu() {
  return (
    <ul className="flex gap-3">
      {/* Facebook link */}
      <li>
        <Link to="#">
          <img
            src={FacebookIcon}
            alt="FacebookIcon"
            className="w-7 bg-primary"
          />
        </Link>
      </li>

      {/* Instagram link */}
      <li>
        <Link to="#">
          <img
            src={InstagramIcon}
            alt="InstagramIcon"
            className="w-7 bg-primary"
          />
        </Link>
      </li>

      {/* Twitter link */}
      <li>
        <Link to="#">
          <img src={TwitterIcon} alt="TwitterIcon" className="w-7 bg-primary" />
        </Link>
      </li>

      {/* LinkedIn link */}
      <li>
        <Link to="#">
          <img
            src={LinkedinIcon}
            alt="LinkedinIcon"
            className="w-7 bg-primary"
          />
        </Link>
      </li>

      {/* YouTube link */}
      <li>
        <Link to="#">
          <img src={YoutubeIcon} alt="YoutubeIcon" className="w-7 bg-primary" />
        </Link>
      </li>
    </ul>
  );
}
