// File: Editpage.js
import React, { useState, useEffect, useRef, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import Layout from "../components/ui/Layout";
import {
  useGetPostByIdQuery,
  useUpdatePostMutation,
} from "../features/api/apiSlice";

const Editpage = () => {
  // Get post ID from URL parameters
  const { id } = useParams();

  // Initialize state and references
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    thumbnail: "",
    featured: false,
  });
  const [updatePost, { isLoading, isSuccess }] = useUpdatePostMutation();
  const navigate = useNavigate();

  // Configuration for JoditEditor
  const editor = useRef(null);
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typing...",
    }),
    []
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

  // Fetch post data by ID
  const { data: post, error, isLoading: isFetching } = useGetPostByIdQuery(id);

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        content: post.content,
        category: post.category,
        thumbnail: post.thumbnail,
        featured: post.featured,
      });
    }
  }, [post]);

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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prepare updated post data
    const updatedPostData = {
      ...formData,
    };

    try {
      await updatePost({
        postId: id,
        updatePostData: updatedPostData,
      }).unwrap();
      navigate("/", { replace: true }); // Navigate to homepage on successful post update
    } catch (error) {
      console.error("Error updating post:", error); // Log any errors during post update
    }
  };

  if (isFetching) return <div>Loading...</div>;
  if (error) return <div>Error loading post data.</div>;

  return (
    <Layout>
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
              disabled={isLoading} // Disable button while updating
            >
              {isLoading ? "Updating..." : "Update Post"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Editpage;
