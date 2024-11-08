import React from "react";
import { PostBtn } from "./PostBtn";
import { useState } from "react";
import { useEffect } from "react";

export const NextResume = () => {
  const[token, setToken] = useState(false);
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  return (
    <div className="mx-6 w-[70vw] min-h-40 shadow-lg rounded-lg p-6">
      <p className="mb-4 text-white/70 border-b-2">Education</p>
      <p className="mb-4 text-white/70 border-b-2">Projects</p>
      <p className="mb-4 text-white/70 border-b-2">Skills</p>
      <div>{token && <PostBtn text={"edit"} />}</div>
    </div>
  );
};
