import React from "react";
import { Tags } from "./Tags";
import { ProfileImage } from "./ProfileImage";

export const ProfileCard = ({recruiter = false, company="", role=""}) => {
  return (
    <div className="w-80 h-40 shadow-lg  rounded-lg p-4">
      <div className="flex ">
        <ProfileImage />
        <div className=" font-normal capitalize mx-6 mt-4">
          {recruiter && <Tags text="recruiter"/> }
          <p>abhinav</p>
          <p>{recruiter ? company : role}</p>
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
