import React from "react";
import Post from "../components/Postpage/Post";
import Sidebar from "../components/Postpage/Sidebar";
import Layout from "../components/ui/Layout";

export default function Singlepage() {
  return (
    <Layout className="grid grid-cols-1 md:grid-cols-[auto_minmax(300px,1fr)] lg:grid-cols-[auto_minmax(450px,1fr)] gap-10">
      <Post />
      <Sidebar />
    </Layout>
  );
}
