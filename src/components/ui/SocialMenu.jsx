import React from "react";
import { Link } from "react-router-dom";
import FacebookIcon from "../../assets/icons/facebook.png";
import InstagramIcon from "../../assets/icons/instagram.png";
import TwitterIcon from "../../assets/icons/twitter.png";
import LinkedinIcon from "../../assets/icons/linkedin.png";
import YoutubeIcon from "../../assets/icons/youtube.png";

export default function SocialMenu() {
  return (
    <ul className="flex gap-3">
      <li>
        <Link to="#">
          <img
            src={FacebookIcon}
            alt="FacebookIcon"
            className="w-7 bg-primary"
          />
        </Link>
      </li>
      <li>
        <Link to="#">
          <img
            src={InstagramIcon}
            alt="InstagramIcon"
            className="w-7 bg-primary"
          />
        </Link>
      </li>
      <li>
        <Link to="#">
          <img src={TwitterIcon} alt="TwitterIcon" className="w-7 bg-primary" />
        </Link>
      </li>
      <li>
        <Link to="#">
          <img
            src={LinkedinIcon}
            alt="LinkedinIcon"
            className="w-7 bg-primary"
          />
        </Link>
      </li>
      <li>
        <Link to="#">
          <img src={YoutubeIcon} alt="YoutubeIcon" className="w-7 bg-primary" />
        </Link>
      </li>
    </ul>
  );
}
