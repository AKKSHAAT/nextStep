import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import { ProfileCard } from "../components/ProfileCard";
import { Heading } from "../components/Heading";
import { NextResume } from "../components/NextResume";
import axios from '../axios.js';

export const UserDash = () => {
  const { id } = useParams(); // Access the 'id' parameter from the URL
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    profilePicture: ''
  });

  useEffect(() => {
    // Fetch user data based on the 'id' param
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/student/${id}`);
        setUserData(response.data);
        console.log("userData: ", userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id]); // Re-run the effect if the 'id' param changes

  return (
    <div>
      <Heading text={"Dashboard"} />
      <div className="flex">
        <ProfileCard  email={userData.email}/> {/* Pass the userData to ProfileCard */}
        <NextResume userId={id} /> {/* Pass the id to NextResume */}
      </div>
    </div>
  );
};
