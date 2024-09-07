import React from "react";
import Hero from "../components/Home/Hero";
import CategoryFeature from "../components/Cards/CategoryFeature";

export default function Homepage() {
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
    <div className="bg-primary min-h-[calc(100vh-449px)]">
      <Hero />
      <>
        {categories.map((category) => (
          <CategoryFeature key={Math.random()} category={category} />
        ))}
      </>
    </div>
  );
}
