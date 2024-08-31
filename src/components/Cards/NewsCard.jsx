import React from "react";
import Image from "../ui/Image";
import Thumbnail from "../../assets/thumbnail.jpg";
import { Link } from "react-router-dom";

export default function NewsCard() {
  return (
    <div className="space-y-3 border p-4">
      <Link to="/news/title">
        <Image src={Thumbnail} />
      </Link>
      <div className="">
        <Link to="/news/title">
          <h2 className="text-xl font-bold text-secondary line-clamp-1 hover:text-blue-500 duration-150 hover:cursor-pointer ">
            Innovative Tech Startup Revolutionizes Remote Work with AI-Driven
            Solutions
          </h2>
        </Link>
        <p className="text-secondary text-base line-clamp-2 leading-7">
          San Francisco, CA — In a groundbreaking move, a Silicon Valley startup
          has unveiled a suite of AI-driven tools aimed at transforming the way
          businesses operate remotely. The startup, named Nexus Innovations,
          launched its platform today, promising to enhance productivity and
          collaboration for remote teams. The platform leverages advanced
          artificial intelligence to automate routine tasks, manage workflows,
          and provide real-time insights into team performance. According to
          Nexus Innovations' CEO, Sarah Thompson, the platform is designed to
          address the unique challenges faced by remote workers, including
          communication barriers and time management.
        </p>
      </div>
    </div>
  );
}
