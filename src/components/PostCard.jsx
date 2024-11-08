import React from "react";
import { ProfileImage } from "./ProfileImage";
import { Link } from "react-router-dom";

export const PostCard = ({ title = "", content = "", author = "" }) => {
  return (
    <div className="flex-col bg-white p-6 rounded-lg shadow-md my-2 text-md capitalize">
      <div className="flex items-start gap-3">
        <ProfileImage small={true} />
        <div className="w-48 self-start">
          <p className="font-semibold block truncate" title={title}>
            {title}
          </p>
          <Link className="text-gray-500 text-sm" to={`user/${author}`}>
            @{author}
          </Link>
        </div>
      </div>
          <p className="text-sm truncate h-32">{content}</p>
    </div>
  );
};
