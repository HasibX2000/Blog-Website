import React from "react";
import Hero from "../components/Home/Hero";
import CategoryFeature from "../components/Cards/CategoryFeature";

export default function Homepage() {
  const categories = [
    {
      categoryName: "Politics",
      categoryId: "d5f6a7b8-9c0d-1e2f-3a4b-5c6d7e8f9a0b",
    },
    {
      categoryName: "National",
      categoryId: "550e8400-e29b-41d4-a716-446655440000",
    },
    {
      categoryName: "International",
      categoryId: "d0b7dbae-dc1e-4a16-9f57-75ac0d3c5c6a",
    },
    {
      categoryName: "Business",
      categoryId: "3d9bd9f2-004d-4b4e-9f14-2f9d6eb8382c",
    },
    {
      categoryName: "Science",
      categoryId: "3b241101-e2bb-4255-8d17-dc09f4ca5e61",
    },
    {
      categoryName: "Health",
      categoryId: "e2a3f6c0-8421-4d0d-9f1d-6a2bb8e2cdad",
    },
    {
      categoryName: "Entertainment",
      categoryId: "c4e5f6a7-8b9c-0d1e-2f3a-4b5c6d7e8f9a",
    },
    {
      categoryName: "Sports",
      categoryId: "b2a3d4e5-6f7a-4b8c-9d0e-1f2a3b4c5d6e",
    },
  ];
  return (
    <div className="bg-primary min-h-[calc(100vh-449px)]">
      <Hero />
      <>
        {categories.map((item) => (
          <CategoryFeature key={Math.random()} category={item} />
        ))}
      </>
    </div>
  );
}
