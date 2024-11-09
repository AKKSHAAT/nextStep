import React from "react";
import { Link } from "react-router-dom";
import { ProfileImage } from "./ProfileImage";
import axios from "../axios.js";
import { Tags } from "./Tags.jsx";

export const JobCard = ({ organization, role, skills, id, img }) => {
  // Handle delete
  async function handleDelete() {
    try {
      const res = await axios.delete(`/api/jobs/${id}`);
      console.log(res.data);
      window.location.reload();
    } catch (err) {
      console.error("Error deleting job:", err);
    }
  }

  // Handle apply
  async function handleApply() {
    try {
      const res = await axios.put(`/api/jobs/apply/${id}`, {
        student: localStorage.getItem("id"),
      });
      console.log(res.data);
    } catch (err) {
      console.error("Error applying:", err);
    }
  }

  return (
    <div className="border border-white/20 text-white rounded-lg shadow-lg p-6 flex gap-8 items-start w-full max-w-4xl mx-auto my-4 hover:shadow-2xl transition-all">
      {/* Profile Image */}
      <div className="w-20 h-20">
        <ProfileImage img={img} />
      </div>

      <div className="w-full">
        {/* Job Role */}
        <Link
          to={`/job/${id}`}
          className="text-xl font-semibold block text-white hover:text-blue-400 truncate"
          title={role}
        >
          {role}
        </Link>

        {/* Organization Name */}
        <p className="text-sm font-medium text-gray-300 mt-1">{organization}</p>

        {/* Skills */}
        <div className="flex flex-wrap mt-4">
          {skills && skills.map((skill, i) => <Tags key={i} text={skill} />)}
        </div>

        {/* Apply/Delete Button */}
        <div className="mt-6">
          {!localStorage.getItem("rec") ? (
            <button
              onClick={handleApply}
              className="bg-white/10 text-white py-2 px-4 rounded-lg hover:bg-white/20 transition duration-300"
            >
              Apply
            </button>
          ) : (
            skills && (
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Delete
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};
