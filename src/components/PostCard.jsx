import React from "react";
import { ProfileImage } from "./ProfileImage";
import { Link } from "react-router-dom";
import {Tags} from "./Tags";

export const PostCard = ({ title = "", content = "", author = "", id = "" }) => {
  console.log("Post ID in PostCard:", id);
  return (
    <div className="flex-col bg-white/5 text-white p-6 rounded-lg shadow-md my-2 text-md capitalize">
      <div className="flex items-start gap-3">
        <ProfileImage small={true} />
        <div className="self-start">
          <p className="font-semibold block " title={title}>
            {title}
          </p>
          <Link className="text-gray-500 text-sm w-80" to={`recruiter/${author}`}>
            @{author} <Tags text={"recruiter"} />
          </Link>
        </div>
      </div>
      <p className="text-sm  h-32 mt-4">{content}</p>
      
      <div className="mt-4">
        <Link to={`/post/comments/${id}`} className="text-blue-400 hover:underline text-sm">
          Read Comments
        </Link>
      </div>
    </div>
  );
};
