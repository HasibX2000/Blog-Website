// File: Form.js
// This component represents a form for creating new posts. It includes fields for title, content, category,
// thumbnail URL, and a featured checkbox. It uses JoditEditor for rich text content editing.

import React, { useState, useRef, useMemo } from "react";
import { useCreatePostMutation } from "../../features/api/apiSlice";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";

const Form = () => {
  // Configuration for JoditEditor
  const placeholder = "Start typing";
  const editor = useRef(null);
  const config = useMemo(
    () => ({
      readonly: false, // Editor is editable
      placeholder: "Start typing...",
    }),
    [placeholder]
  );

  // List of categories for post selection
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

  // State to manage form data
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    thumbnail: "",
    featured: false,
  });

  // Hook for navigation
  const navigate = useNavigate();

  // Mutation hook for creating a new post
  const [createPost, { isLoading, isSuccess }] = useCreatePostMutation();

  // Handle changes in form fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle changes in JoditEditor content
  const handleEditorChange = (content) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  // Get the current UTC date and time formatted as 'YYYY-MM-DD HH:MM:SS'
  const getFormattedDate = () => {
    const date = new Date();
    const formattedDate = date
      .toLocaleString("en-CA", {
        timeZone: "UTC",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
      .replace(",", ""); // Remove any commas
    return `${formattedDate}+00`; // Add UTC offset
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const timestamp = getFormattedDate();

    // Prepare new post data
    const newPostData = {
      ...formData,
      created_at: timestamp,
      id: uuidv4(), // Generate a unique ID for the post
    };

    try {
      await createPost(newPostData).unwrap();
      navigate("/", { replace: true }); // Navigate to homepage on successful post creation
    } catch (error) {
      console.error("Error creating post:", error); // Log any errors during post creation
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
        {/* Title Field */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="Enter title"
            required
          />
        </div>

        {/* Content Field */}
        <div className="mb-4">
          <JoditEditor
            ref={editor}
            value={formData.content}
            config={config}
            tabIndex={1} // Tab index for the editor
            onBlur={handleEditorChange} // Update form data on editor blur
          />
        </div>

        {/* Category Dropdown */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="category"
          >
            Select Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Thumbnail Field */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="thumbnail"
          >
            Thumbnail URL
          </label>
          <input
            type="text"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="Enter thumbnail URL"
            required
          />
        </div>

        {/* Featured Checkbox */}
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="form-checkbox"
            />
            <span className="ml-2 text-gray-700">Featured</span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="text-center mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition duration-200"
          >
            Add News
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
