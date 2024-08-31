import React from "react";
import Layout from "../ui/Layout";
import NewsCard from "../Cards/NewsCard";
import FeaturedCard from "../Cards/FeaturedCard";

export default function Hero() {
  return (
    <div>
      <Layout>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* First column with 1 row */}
          <div className="border p-4">
            <FeaturedCard />
          </div>

          {/* Second column with 2 rows */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <NewsCard />
            <NewsCard />
            <NewsCard />
            <NewsCard />
          </div>
        </div>
      </Layout>
    </div>
  );
}
