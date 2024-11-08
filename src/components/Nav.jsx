import React from "react";
import { Link } from "react-router-dom";
import { ProfileImage } from "./ProfileImage";

export const Nav = () => {
  return (
    <div className="flex bg-white p-6 justify-between shadow-xl font-bold text-md items-center ">
      <div className="">
        <Link to={"/"}>
          <ProfileImage small="true" />
        </Link>
      </div>
      <div className="flex gap-8 ">
        <Link to={"/community"}>Community</Link>
        <Link to={"/Jobs"}>Jobs</Link>
        <Link to={"/upskill "}>Upskill</Link>
      </div>
      <div>login</div>
    </div>
  );
};
