import React from "react";
import RelatedPost from "./RelatedPost";
import RecentPost from "./RecentPost";
import Sponsors from "./Sponsors";

export default function Sidebar() {
  return (
    <div className="space-y-5">
      <RelatedPost />
      <Sponsors />
      <RecentPost />
    </div>
  );
}
