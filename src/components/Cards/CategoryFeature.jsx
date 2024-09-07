import React from "react";
import NewsCard from "./NewsCard";
import Layout from "../ui/Layout";
import { useGetPostsByCategoryQuery } from "../../features/news/newsApi";
import Loading from "../ui/Loading";

export default function CategoryFeature({ category }) {
  const {
    data: postsData,
    error: postsError,
    isLoading: isPostsLoading,
  } = useGetPostsByCategoryQuery(category);

  if (isPostsLoading) {
    return <Loading />;
  }

  if (postsError) {
    return (
      <Layout className="flex justify-center items-center py-32">
        <h2>Error: {categoryError?.message || postsError?.message}</h2>
      </Layout>
    );
  }

  return (
    postsData.length > 0 && (
      <Layout>
        <h2 className="bg-secondary px-5 py-1 text-primary  font-semibold text-lg inline-block">
          {category}
        </h2>
        <hr />
        <div className=" mt-5 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {postsData.map((post) => (
            <NewsCard key={post.id} postId={post.id} />
          ))}
        </div>
      </Layout>
    )
  );
}
