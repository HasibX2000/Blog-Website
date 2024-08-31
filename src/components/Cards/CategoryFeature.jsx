import React from "react";
import NewsCard from "./NewsCard";
import Layout from "../ui/Layout";

export default function CategoryFeature({ title }) {
  return (
    <Layout>
      <h2 className="bg-secondary px-5 py-1 text-primary  font-semibold text-lg inline-block">
        {title}
      </h2>
      <hr />
      <div className=" mt-5 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5">
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
      </div>
    </Layout>
  );
}
