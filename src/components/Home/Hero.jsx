import React from "react";
import Layout from "../ui/Layout";
import NewsCard from "../Cards/NewsCard";
import FeaturedCard from "../Cards/FeaturedCard";
import { useGetLatestPostsQuery } from "../../features/api/apiSlice";

export default function Hero() {
  const {
    data: latestPosts,
    isLoading,
    error,
    isError,
  } = useGetLatestPostsQuery() || [];
  const [firstItem, ...remainingItems] = latestPosts || [];
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
    content = (
      <div>
        <Layout>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* First column with 1 row */}
            <div className="border p-4">
              <FeaturedCard post={firstItem} />
            </div>

            {/* Second column with 2 rows */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {remainingItems.map((post) => (
                <NewsCard key={post.id} postId={post.id} />
              ))}
            </div>
          </div>
        </Layout>
      </div>
    );
  }

  return content;
}
