// File: src/pages/Homepage.js
// Description: This component represents the homepage of the application.
// It includes a Hero section and dynamically renders a list of CategoryFeature components.

import React from "react";
import Hero from "../components/Home/Hero";
import CategoryFeature from "../components/Cards/CategoryFeature";

export default function Homepage() {
  // List of categories to be displayed on the homepage
  const categories = [
    "Science",
    "Business",
    "National",
    "Sports",
    "Entertainment",
    "International",
    "Politics",
    "Health",
  ];

  return (
    // The div container is styled with a primary background color and ensures the minimum height adjusts to the viewport minus a specific value.
    <div className="bg-primary min-h-[calc(100vh-449px)]">
      {/* Hero component displayed at the top of the homepage */}
      <Hero />
      <>
        {/* 
          Map through the categories array to dynamically render CategoryFeature components for each category.
          - The 'key' prop is used to uniquely identify each CategoryFeature component.
          - Using 'Math.random()' for 'key' is not recommended for production code as it does not ensure unique or stable keys.
          Consider using a unique value, such as an ID or index, if available.
        */}
        {categories.map((category) => (
          <CategoryFeature key={category} category={category} />
        ))}
      </>
    </div>
  );
}
