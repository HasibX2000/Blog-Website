import React from "react";
import MiniPost from "./MiniPost";
import { useGetLatestPostsQuery } from "../../features/news/newsApi";
import Layout from "../ui/Layout";

export default function RecentPost() {
  const {
    data: latestPosts,
    isLoading,
    error,
    isError,
  } = useGetLatestPostsQuery() || [];

  let content = null;
  if (isLoading) {
    content = (
      <div>
        <Layout>
          <h2>Loading...</h2>
        </Layout>
      </div>
    );
  } else if (error) {
    content = (
      <div>
        <Layout>
          <h2>There was an error</h2>
        </Layout>
      </div>
    );
  } else if (!isLoading && !isError && latestPosts.length > 0) {
    content = latestPosts.map((post) => <MiniPost key={post.id} post={post} />);
  }
  return (
    <div>
      <div className="border-b border-b-secondary mb-5">
        <h2 className="bg-secondary text-xl font-semibold  text-white px-3 py-1 inline-block">
          Recent Posts
        </h2>
      </div>
      <div className="space-y-3">{content}</div>
    </div>
  );
}
