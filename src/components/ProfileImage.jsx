import React from "react";

export const ProfileImage = ({ small = false }) => {
  return (
    <div
      className={`${
        small ? "w-10 h-10" : "w-20 h-20"
      } rounded-full bg-slate-400 overflow-hidden`}
    >
      <img src="" alt="Profile" className="w-full h-full object-cover" />
    </div>
  );
};
