import React from "react";
import Post from "../components/Postpage/Post";
import Sidebar from "../components/Postpage/Sidebar";
import Layout from "../components/ui/Layout";
import { useGetPostByTitleQuery } from "../features/api/apiSlice";
import { useParams } from "react-router-dom";

export default function Singlepage() {
  const { title } = useParams();

  const { data: post, error, isLoading } = useGetPostByTitleQuery(title) || {};

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>; // Ensure error.message is a string

  return (
    <Layout className="grid grid-cols-1 md:grid-cols-[auto_minmax(300px,1fr)] lg:grid-cols-[auto_minmax(450px,1fr)] gap-10">
      <Post post={post} />
      <Sidebar post={post} />
    </Layout>
  );
}
