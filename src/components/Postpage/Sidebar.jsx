// File: Sidebar.js
// This component represents the sidebar of the page, displaying related posts, recent posts, and sponsors.
// It accepts a `post` prop to provide the ID for fetching related posts.

import React from "react";
import RelatedPost from "./RelatedPost"; // Component to display related posts based on the current post ID
import RecentPost from "./RecentPost"; // Component to display a list of recent posts
import Sponsors from "./Sponsors"; // Component to display sponsor information

export default function Sidebar({ post }) {
  return (
    <div className="space-y-5">
      {/* Display related posts based on the current post's ID */}
      <RelatedPost postId={post.id} />

      {/* Display sponsor information */}
      <Sponsors />

      {/* Display a list of recent posts */}
      <RecentPost />

      {/* Display additional sponsor information */}
      <Sponsors />
    </div>
  );
}
