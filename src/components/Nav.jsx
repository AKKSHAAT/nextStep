import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProfileImage } from "./ProfileImage";

export const Nav = () => {
  const navigate = useNavigate();

  // Initialize state directly from localStorage
  const [authData, setAuthData] = useState({
    token: localStorage.getItem("token"),
    email: localStorage.getItem("email"),
    id: localStorage.getItem("id"),
    rec: localStorage.getItem("rec"),
  });

  const logout = () => {
    localStorage.clear();
    setAuthData({ token: null, email: null, id: null, rec: null }); // Clear state on logout
    navigate('/login');
  };

  // useEffect will listen for changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setAuthData({
        token: localStorage.getItem("token"),
        email: localStorage.getItem("email"),
        id: localStorage.getItem("id"),
        rec: localStorage.getItem("rec"),
      });
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className="flex bg-black border border-white/30 rounded-sm text-white text-opacity-40 p-6 justify-between shadow-xl font-bold text-md items-center">
      <div className="flex gap-4 items-center">
        <ProfileImage small="true" />
        {authData.rec ? (
          <Link to={`/recruiter/${authData.id}`}>{authData.email}</Link>
        ) : (
          <Link to={`/dashboard/${authData.id}`}>{authData.email}</Link>
        )}
      </div>
      <div className="flex gap-8 ">
        <Link to={"/community"} className="hover:text-white duration-100">
          Community
        </Link>
        <Link to={"/Jobs"} className="hover:text-white duration-100">
          Jobs
        </Link>
        <Link to={"/upskill"} className="hover:text-white duration-100">
          Upskill
        </Link>
      </div>
      {authData.token ? (
        <button onClick={logout} className="hover:text-white duration-200 cursor-pointer">
          Logout
        </button>
      ) : (
        <Link to={'/login'} className="hover:text-white duration-200 cursor-pointer">
          Login
        </Link>
      )}
    </div>
  );
};
