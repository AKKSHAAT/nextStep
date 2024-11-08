import React from "react";

export const ProfileCard = () => {
  return (
    <div className="w-80 h-40 shadow-lg  rounded-lg p-4">
      <div className="flex ">
        <div className="w-20 h-20 rounded-full bg-slate-400">
          <img />
        </div>
        <div className=" font-normal capitalize mx-6 mt-4">
          <p>abhinav</p>
          <p>web developer</p>
        </div>
      </div>
      <div className="mt-6 flex gap-2">
        <div className="w-6 h-6 rounded-full bg-slate-400 ">
          <img />
        </div>
        <div className="w-6 h-6 rounded-full bg-slate-400 ">
          <img />
        </div>
        <div className="w-6 h-6 rounded-full bg-slate-400 ">
          <img />
        </div>
      </div>
    </div>
  );
};
