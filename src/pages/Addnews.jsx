import React from "react";
import Form from "../components/News/Form";
import Layout from "../components/ui/Layout";

export default function Addnews() {
  return (
    <Layout className="py-20">
      <h2 className="text-center text-3xl font-bold">Add News</h2>
      <Form />
    </Layout>
  );
}
