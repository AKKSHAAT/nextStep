import React, { useState, useEffect } from "react";
import { PostCard } from "../components/PostCard";
import { useNavigate } from "react-router-dom";
import axios from "../axios.js";

export const Community = () => {
  const [amas, setAmas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAmas = async () => {
      try {
        const response = await axios.get("/api/ama/");
        setAmas(response.data);
      } catch (error) {
        console.error("Error fetching AMAs:", error);
      }
    };

    fetchAmas();
  }, []);

  const handleButtonClick = () => {
    navigate('/ama-form');
  };

  return (
    <div>
      {amas.map((ama) => {
        console.log("AMA ID:", ama._id, "Type:", typeof ama._id); // Check ID and type
        return (
          <PostCard 
            key={ama._id} 
            title={ama.title} 
            content={ama.content} 
            author={ama.creatorId|| "Unknown"} 
            id={ama._id} // Pass `id` correctly here
          />
        );
      })}

      <div className="footer-container fixed bottom-0 left-0 w-full text-white p-4 flex justify-between items-center">
        <button
          onClick={handleButtonClick}
          className="fixed bottom-24 right-24 w-16 h-16 rounded-full bg-white/30 text-white text-2xl font-bold shadow-lg flex items-center justify-center hover:bg-white/50 transition duration-300"
          aria-label="Ask Me Anything"
        >
          +
        </button>
      </div>
    </div>
  );
};
