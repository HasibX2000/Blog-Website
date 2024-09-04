import React, { useState } from "react";
import Layout from "../components/ui/Layout";
import NewsCard from "../components/Cards/NewsCard";
import Pagination from "../components/ui/Pagination";
import {
  useGetCategoryIdQuery,
  useGetPostsByCategoryQuery,
} from "../features/api/apiSlice";
import { useParams } from "react-router-dom";

export default function CategoryPage() {
  const { category } = useParams();
  const [currentPage, setCurrentPage] = useState(1); // State to track the current page
  const postsPerPage = 12;
  const {
    data: categoryData,
    error: categoryError,
    isLoading: isCategoryLoading,
  } = useGetCategoryIdQuery(category);
  const categoryId = categoryData?.categoryId;

  const {
    data: postsData,
    error: postsError,
    isLoading: isPostsLoading,
  } = useGetPostsByCategoryQuery(categoryId);

  if (isCategoryLoading || isPostsLoading) {
    return (
      <Layout className="flex justify-center items-center py-32">
        <h2>Loading...</h2>
      </Layout>
    );
  }

  if (categoryError || postsError) {
    return (
      <Layout className="flex justify-center items-center py-32">
        <h2>Error: {categoryError?.message || postsError?.message}</h2>
      </Layout>
    );
  }

  // Assuming the API returns total posts count for calculating total pages
  const totalPosts = postsData?.totalPosts || 0;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  return (
    <div>
      {postsData.length > 0 && (
        <Layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {postsData?.map((post) => (
            <NewsCard key={post.id} postId={post.id} />
          ))}
        </Layout>
      )}

      {postsData.length === 0 && (
        <Layout className="flex justify-center items-center">
          <h2 className=" py-32">No Posts Found</h2>
        </Layout>
      )}

      {postsData.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
