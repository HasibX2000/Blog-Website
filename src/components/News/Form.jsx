import React, { useState, useRef, useMemo } from "react";
import { useCreatePostMutation } from "../../features/api/apiSlice";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";

const Form = () => {
  const placeholder = "Start typing";
  const editor = useRef(null);
  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/
      placeholder: "Start typings...",
    }),
    [placeholder]
  );
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
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    thumbnail: "",
    featured: false,
  });
  const navigate = useNavigate();
  const [createPost, { isLoading, isSuccess }] = useCreatePostMutation();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleEditorChange = (content) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  const getFormattedDate = () => {
    // Get the current UTC date and time
    const date = new Date();

    // Format the date and time in 'YYYY-MM-DD HH:MM:SS' format
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
      .replace(",", ""); // Replace any commas

    // Add +00 (UTC) at the end
    return `${formattedDate}+00`;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const timestamp = getFormattedDate();

    const newPostData = {
      ...formData,
      created_at: timestamp,
      id: uuidv4(),
    };

    try {
      await createPost(newPostData).unwrap();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error creating post:", error);
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
            tabIndex={1} // tabIndex of textarea
            onBlur={handleEditorChange}
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
