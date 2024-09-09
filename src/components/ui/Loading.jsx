// File: Loading.js
// This component displays a loading message centered within the layout.

import React from "react";
import Layout from "./Layout";

// Functional component to show a loading state
export default function Loading() {
  return (
    <Layout className="flex justify-center items-center py-32">
      {/* Use Layout component to center the loading message */}
      <h2>Loading...</h2> {/* Display a loading message */}
    </Layout>
  );
}
