import React from "react";
import { ProfileCard } from "../components/ProfileCard";
import { Heading } from "../components/Heading";
import { NextResume } from "../components/NextResume";
import { PostBtn } from "../components/PostBtn";
import { useNavigate } from "react-router-dom";


export const RDash = () => {
  const navigate = useNavigate();

  function showRecruiterJobs(){
    navigate("/r-jobs/5")
  }
  return (
    <div>
      <Heading text={"dashboard"} />
      <div className=" flex">
        <div>
          <ProfileCard recruiter={true} company={"gehu"}/>
          <div className="flex mt-2">
            <PostBtn text="post a job" />
            <PostBtn text="your Jobs" onClick={showRecruiterJobs}/>
          </div>
        </div>
        <div className="mx-6 w-[70vw] min-h-40 shadow-lg rounded-lg p-6">
          
          <div>
            <PostBtn text={"edit profile"} />
          </div>
        </div>
      </div>
    </div>
  );
};
