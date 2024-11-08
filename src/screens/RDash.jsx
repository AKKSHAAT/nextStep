import React , {useState} from "react";
import { ProfileCard } from "../components/ProfileCard";
import { useParams } from "react-router-dom"; 
import { Heading } from "../components/Heading";
import { PostBtn } from "../components/PostBtn";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "../axios";


export const RDash = () => {
  const navigate = useNavigate();

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
        const response = await axios.get(`/api/recruiter/${id}`);
        setUserData(response.data);
        console.log("userData: ", userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id]);

  function showRecruiterJobs(){
    navigate(`/r-jobs/${id}`);
  }
  
  return (
    <div>
      <Heading text={"dashboard"} />
      <div className=" flex">
        <div>
          <ProfileCard recruiter={true} company={"gehu"} email={userData.email}/>
          <div className="flex mt-2">
            <PostBtn onClick={()=> navigate(`/post-job/${id}`)} text="post a job" />
            <PostBtn text="your Jobs" onClick={showRecruiterJobs}/>
          </div>
        </div>
        <div className="mx-6 w-[70vw] min-h-40 shadow-lg rounded-lg p-6"> 
          <div>
          {
            id === localStorage.getItem('id') && <PostBtn text={"edit profile"} />
          }
          </div>
        </div>
      </div>
    </div>
  );
};
