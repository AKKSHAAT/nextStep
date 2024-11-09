import React from "react";

export const ProfileImage = ({ small = false, img }) => {
  return (
    <div
      className={`${
        small ? "w-10 h-10" : "w-20 h-20"
      } rounded-full overflow-hidden`} // Ensure the div is circular with overflow hidden
    >
      <img
        src={img || "/user-avatar.png"} // Use default image if no img prop is passed
        alt="Profile"
        className="w-full h-full object-cover" // Make the image cover the entire circle, keeping the aspect ratio
      />
    </div>
  );
};
