import React from "react";
import RelatedPost from "./RelatedPost";
import RecentPost from "./RecentPost";
import Sponsors from "./Sponsors";

export default function Sidebar({ post }) {
  return (
    <div className="space-y-5">
      <RelatedPost postId={post.id} />
      <Sponsors />
      <RecentPost />
      <Sponsors />
    </div>
  );
}
