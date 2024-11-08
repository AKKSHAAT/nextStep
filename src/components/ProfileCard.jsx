import React from "react";
import { Tags } from "./Tags";
import { ProfileImage } from "./ProfileImage";

export const ProfileCard = ({recruiter = false, company="", role="", email}) => {
  return (
    <div className="w-80 h-40 shadow-lg  rounded-lg p-4">
      <div className="flex items-center ">
        <ProfileImage />
        <div className=" font-normal capitalize mx-6 mt-4">
          {recruiter && <Tags text="recruiter"/> }
          <p>{email || "n/a"}</p>
          <p>{recruiter ? company : role}</p>
        </div>
      </div>
    </div>
  );
};
