import React from "react";
import Image from "../ui/Image";

export default function Post({ post }) {
  const { title, content, thumbnail } = post;

  return (
    <div className="space-y-5">
      <h1 className="text-xl lg:text-4xl font-bold text-secondary">{title}</h1>
      <Image src={thumbnail} />
      <div
        className="space-y-5 text-base text-secondary"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
