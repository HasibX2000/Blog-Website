import React from "react";
import Layout from "../components/ui/Layout";
import NewsCard from "../components/Cards/NewsCard";
import Pagination from "../components/ui/Pagination";

export default function Categorypage() {
  return (
    <div>
      <Layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
      </Layout>

      <Pagination currentPage={2} totalPages={20} onPageChange={false} />
    </div>
  );
}
