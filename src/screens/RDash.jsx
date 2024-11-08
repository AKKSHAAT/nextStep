import React from "react";
import { ProfileCard } from "../components/ProfileCard";
import { Heading } from "../components/Heading";
import { NextResume } from "../components/NextResume";

export const UserDash = () => {
  return (
    <div>
      <Heading text={"dashboard"} />
      <div className=" flex">
        <ProfileCard />
        <NextResume />
      </div>
    </div>
  );
};
