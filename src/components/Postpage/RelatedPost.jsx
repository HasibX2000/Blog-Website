import React from "react";
import MiniPost from "./MiniPost";
import { useGetRelatedPostsQuery } from "../../features/api/apiSlice";
import Layout from "../ui/Layout";
import Loading from "../ui/Loading";

export default function RelatedPost({ postId }) {
  const {
    data: relatedPosts,
    isLoading,
    error,
    isError,
  } = useGetRelatedPostsQuery(postId) || [];

  let content = null;
  if (isLoading) {
    content = <Loading />;
  } else if (error) {
    content = (
      <div>
        <Layout className="bg-red-500">
          <h2 className="text-white px-4">No related post found!</h2>
          {console.log(error)}
        </Layout>
      </div>
    );
  } else if (!isLoading && !isError && relatedPosts.length > 0) {
    content = relatedPosts.map((post) => (
      <MiniPost key={post.id} post={post} />
    ));
  }
  return (
    <div>
      <div className="border-b border-b-secondary mb-5">
        <h2 className="bg-secondary text-xl font-semibold  text-white px-3 py-1 inline-block">
          Related Posts
        </h2>
      </div>
      <div className="space-y-3">{content}</div>
    </div>
  );
}
