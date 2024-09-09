// File: src/pages/Errorpage.js
// Description: This component displays an error page with a centered image.
// It uses the Layout component to ensure consistent styling and alignment.

import React from "react";
import Layout from "../components/ui/Layout";
import ErrorImage from "../assets/error.png";

export default function Errorpage() {
  return (
    // The Layout component is used to center the content on the page.
    // The 'flex', 'justify-center', and 'items-center' classes ensure that the content is centered both horizontally and vertically.
    <Layout className={`flex justify-center items-center`}>
      {/* 
        The img element displays an error image.
        - 'src' points to the image file imported at the top.
        - 'className="w-1/3"' sets the width of the image to one-third of its container.
        - 'alt="Error"' provides alternative text for the image to improve accessibility.
      */}
      <img src={ErrorImage} className="w-1/3" alt="Error" />
    </Layout>
  );
}
