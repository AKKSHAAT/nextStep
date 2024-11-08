import React from "react";
import { Link } from "react-router-dom";
import { ProfileImage } from "./ProfileImage";

export const Nav = () => {
  return (
    <div className="flex bg-black border border-white/30 rounded-sm text-white text-opacity-40 p-6 justify-between shadow-xl font-bold text-md items-center">
      <div className="">
        <Link to={"/"}>
          <ProfileImage small="true" />
        </Link>
      </div>
      <div className="flex gap-8 ">
        <Link to={"/community"} className="hover:text-white duration-100">Community</Link>
        <Link to={"/Jobs"} className="hover:text-white duration-100">Jobs</Link>
        <Link to={"/upskill "} className="hover:text-white duration-100">Upskill</Link>
      </div>
      <div className="hover:text-white duration-200 cursor-pointer">login</div>
    </div>
  );
};
