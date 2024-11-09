import React from "react";
import { Link } from "react-router-dom";
import { ProfileImage } from "./ProfileImage";
import axios from "../axios.js";
import { Tags } from "./Tags.jsx";

export const JobCard = ({ organization, role, skills, id }) => {
  async function handleDelete() {
    const res = await axios.delete(`/api/jobs/${id}`);
    console.log(res.data);
    window.location.reload();
  }

  async function handleApply() {
    const res = await axios.put(`/api/jobs/apply/${id}`, {student: localStorage.getItem('id')});
    console.log(res.data);
  }
  return (
    <div className="flex bg-black text-white gap-8 p-6 shadow-md my-2 text-md capitalize w-[70dvw]">
      <ProfileImage />
      <div className="pr-6  w-full">
        <Link
          className="text-semibold font-semibold block truncate"
          title={role} // Optional: show full text on hover
        >
          {role}
        </Link>
        <p className="text-sm font-medium">{organization}</p>
        <p className="text-sm font-medium">{"adsaldmakpsmdkasndflkasnldasn sjdfkdsjflds fdsfjk;ajsf ajdfkajs;lfdladnas"}</p>
        <div className="flex mt-10">
          {skills &&
            skills.map((skill, i) => <Tags key={skill} text={skill} />)}
        </div>
      </div>
      {!localStorage.getItem("rec") ? (
        <button
          onClick={handleApply}
          className=" bg-black rounded-lg h-10 px-2 mt-auto border-2 border-white/30 "
        >
          Apply
        </button>
      ) : (
        <button
          onClick={handleDelete}
          className=" bg-red-400 rounded-lg h-10 px-2 mt-auto "
        >
          Delete
        </button> 
      )}
    </div>
  );
};
