import React from "react";

export const PostBtn = ({ text = "", onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        capitalize
        bg-fuchsia-300 
        text-white 
        font-semibold
        rounded-xl 
        py-2 px-4 
        mx-2 w-32
        text-center 
        cursor-pointer 
        transform 
        transition-transform 
        duration-200 
        hover:scale-110
        shadow-md 
        hover:shadow-lg
      "
    >
      {text}
    </button>
  );
};
