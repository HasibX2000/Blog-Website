import React, { useState } from "react";
import Layout from "../components/ui/Layout";
import NewsCard from "../components/Cards/NewsCard";
import Pagination from "../components/ui/Pagination";
import { useParams } from "react-router-dom";
import Loading from "../components/ui/Loading";
import { useGetPostsByCategoryQuery } from "../features/news/newsApi";

export default function CategoryPage() {
  const { category } = useParams();
  const [currentPage, setCurrentPage] = useState(1); // State to track the current page
  const postsPerPage = 12;

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
        <h2>Error: {postsError.message}</h2>
      </Layout>
    );
  }

  // Pagination calculation
  const totalPosts = postsData?.length || 0;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  // Slice the posts for the current page
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts =
    postsData?.slice(startIndex, startIndex + postsPerPage) || [];

  return (
    <div>
      {currentPosts.length > 0 && (
        <Layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {currentPosts.map((post) => (
            <NewsCard key={post.id} postId={post.id} />
          ))}
        </Layout>
      )}

      {currentPosts.length === 0 && (
        <Layout className="flex justify-center items-center py-32">
          <h2>No Posts Found</h2>
        </Layout>
      )}

      {currentPosts.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
