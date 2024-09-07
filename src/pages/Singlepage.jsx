import React from "react";
import Post from "../components/Postpage/Post";
import Sidebar from "../components/Postpage/Sidebar";
import Layout from "../components/ui/Layout";
import { useGetPostByTitleQuery } from "../features/news/newsApi";
import { useParams } from "react-router-dom";
import Loading from "../components/ui/Loading";

export default function Singlepage() {
  const { title } = useParams();

  const { data: post, error, isLoading } = useGetPostByTitleQuery(title) || {};

  if (isLoading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>; // Ensure error.message is a string

  return (
    <Layout className="grid grid-cols-1 md:grid-cols-[auto_300px] lg:grid-cols-[auto_450px] gap-10">
      <Post post={post} />
      <Sidebar post={post} />
    </Layout>
  );
}
