import React from "react";
import MiniPost from "./MiniPost";

export default function RelatedPost() {
  return (
    <div>
      <div className="border-b border-b-secondary mb-5">
        <h2 className="bg-secondary text-xl font-semibold  text-white px-3 py-1 inline-block">
          Related Posts
        </h2>
      </div>
      <div className="space-y-3">
        <MiniPost /> <MiniPost /> <MiniPost /> <MiniPost /> <MiniPost />
      </div>
    </div>
  );
}
