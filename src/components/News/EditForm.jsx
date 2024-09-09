import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetPostByTitleQuery,
  useUpdatePostMutation,
} from "../../features/api/apiSlice";
import JoditEditor from "jodit-react";

const EditForm = () => {
  const { title } = useParams();
  const { data: post, isLoading, error } = useGetPostByTitleQuery(title);
  const [updatePost] = useUpdatePostMutation();
  const navigate = useNavigate();
  const editor = useRef(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    thumbnail: "",
    featured: false,
  });

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        content: post.content,
        category: post.category || "",
        thumbnail: post.thumbnail,
        featured: post.featured,
      });
    }
  }, [post]);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typing...",
    }),
    []
  );

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updatePost({ postId: post.id, updatedPostData: formData }).unwrap();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading post: {error.message}</p>;

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
            tabIndex={1}
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
            {/* Add category options */}
            {[
              "Science",
              "Business",
              "National",
              "Sports",
              "Entertainment",
              "International",
              "Politics",
              "Health",
            ].map((category) => (
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
            Edit Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
