import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

export default function App() {
  const [product, setProduct] = useState({
    name: "",
    description: ""
  });

  const [tags, setTags] = useState([]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.put("http://localhost:5000/api/ai/category", product);

    setTags(res.data.product.aiInfo.seoTags || []);
    console.log(res.data.product.aiInfo.seoTags);
  } catch (err) {
    console.error(err);
  }
};


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white shadow-md rounded-lg p-6">
        <h3 className="text-2xl font-bold text-blue-500 mb-4 text-center">
          WE PROVIDE YOU WITH THE BEST AND SUSTAINABLE TAGS FOR YOUR PRODUCT
        </h3>

        <h2 className="text-xl font-semibold mb-4 text-gray-700">Add Product</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter product name"
              value={product.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Product Description
            </label>
            <textarea
              name="description"
              placeholder="Enter product description"
              value={product.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600  active:bg-blue-300 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>

      {tags.length > 0 && (
        <div className="max-w-xl w-full bg-gray-200 shadow-md rounded-lg p-6 mt-6">
          <h4 className="text-lg font-semibold text-gray-700 mb-4">
            HERE ARE THE BEST TAGS BASED ON YOUR PRODUCT AND DESCRIPTION
          </h4>
          <ul className="space-y-2">
            {tags.map((tag, index) => (
              <li
                key={index}
                className="bg-white border border-gray-300 rounded-md px-3 py-2 shadow-sm"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
