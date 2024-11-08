import React from "react";

export const Tags = ({ text = "" }) => {
  return (
    <div className="p-1 text-white text-center font-semibold text-xs bg-black border-2 border-white/50 rounded-xl w-20 capitalize mr-2 mb-2">
      {text}
    </div>
  );
};
