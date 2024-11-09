import React, { useState } from 'react';
import axios from '../axios.js';
import { useNavigate } from 'react-router-dom';

const AMAForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const creatorId = localStorage.getItem('id'); // Assuming user ID is stored in localStorage

  const handleSubmit = async (e) => {
    e.preventDefault();

    const amaData = { title, content, creatorId };

    try {
      const response = await axios.post('/api/ama/create', amaData);
      alert("AMA created successfully!");
      navigate(`/ama/${response.data._id}`); // Navigate to the new AMA's page
    } catch (error) {
      console.error("Error creating AMA", error);
      alert("Failed to create AMA.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="p-8 rounded-md shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Start a New AMA</h2>
        <p className="text-center mb-6 capitalize">Share knowledge and answer questions</p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="font-semibold mb-2 block">Title</label>
            <input
              type="text"
              placeholder="Enter AMA Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="font-semibold mb-2 block">Content</label>
            <textarea
              placeholder="What do you want to discuss?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md"
              required
              rows="6"
            ></textarea>
          </div>

          <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-md font-semibold mt-4">
            Post AMA
          </button>
        </form>
      </div>
    </div>
  );
};

export default AMAForm;
 