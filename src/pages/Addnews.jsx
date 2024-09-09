// File: src/pages/Addnews.js
// This component renders the page for adding news, including a form for user input.

import React from "react";
import Form from "../components/News/Form";
import Layout from "../components/ui/Layout";

// Functional component for the "Add News" page
export default function Addnews() {
  return (
    <Layout className="py-20">
      {/* Layout component to provide consistent page styling and spacing */}
      <h2 className="text-center text-3xl font-bold">Add News</h2>
      {/* Render the Form component for adding news */}
      <Form />
    </Layout>
  );
}
