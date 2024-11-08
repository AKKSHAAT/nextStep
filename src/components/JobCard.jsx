import React from "react";
import { Link } from "react-router-dom";
import { ProfileImage } from "./ProfileImage";

export const JobCard = ({ organization, role }) => {
  return (
    <div className="flex bg-black text-white gap-8 p-6 shadow-md my-2 text-md capitalize">
      <ProfileImage />
      <div className="pr-6 border-r-2 w-48">
        <Link
          className="text-semibold font-semibold block truncate"
          title={role} // Optional: show full text on hover
        >
          {role}
        </Link>
        <p className="text-sm font-medium">{organization}</p>
      </div>
    </div>
  );
};
