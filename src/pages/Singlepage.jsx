// File: src/pages/Singlepage.js
// Description: This component represents a single post page. It fetches a post based on the title from the URL parameters,
// displays the post content using the Post component, and renders a Sidebar component with additional information related to the post.

import React from "react";
import Post from "../components/Postpage/Post";
import Sidebar from "../components/Postpage/Sidebar";
import Layout from "../components/ui/Layout";
import { useGetPostByTitleQuery } from "../features/api/apiSlice";
import { useParams } from "react-router-dom";
import Loading from "../components/ui/Loading";

export default function Singlepage() {
  // Extract the 'title' parameter from the URL using useParams hook
  const { title } = useParams();

  // Fetch the post data using the title as a parameter
  const { data: post, error, isLoading } = useGetPostByTitleQuery(title) || {};

  // Display a loading indicator while the data is being fetched
  if (isLoading) return <Loading />;

  // Display an error message if an error occurs during data fetching
  if (error) return <p>Error: {error.message}</p>; // Ensure error.message is a string

  return (
    // Layout component used to structure the page with a grid layout
    <Layout className="grid grid-cols-1 md:grid-cols-[auto_300px] lg:grid-cols-[auto_450px] gap-10">
      {/* Render the Post component with the fetched post data */}
      <Post post={post} />
      {/* Render the Sidebar component with the fetched post data */}
      <Sidebar post={post} />
    </Layout>
  );
}
