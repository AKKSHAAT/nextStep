import React, { useState, useEffect } from "react";
import { PostBtn } from "./PostBtn";
import { Link } from "react-router-dom";
import { Tags } from "./Tags.jsx";
import axios from "../axios.js"; // Don't forget to import axios

export const NextResume = ({ userId }) => {
  const [token, setToken] = useState(false);
  const [education, setEducation] = useState([{ institution: "", degree: "" }]);
  const [projects, setProjects] = useState([
    { title: "", description: "", technologies: "", link: "" },
  ]);
  const [skills, setSkills] = useState([]);

  async function getDetails() {
    try {
      console.log(userId);
      const res = await axios.get(`api/resume/student/${userId}`);
      console.log("res: ", res.data);
      if (res.data.education) setEducation(res.data.education);
      if (res.data.projects) setProjects(res.data.projects);

      // Check if skills is a string and convert it to an array if needed
      if (res.data.skills) {
        // If skills is a string, split it into an array by commas
        setSkills(
          Array.isArray(res.data.skills)
            ? res.data.skills
            : res.data.skills.split(",").map((skill) => skill.trim())
        );
      }
    } catch (error) {
      console.error("Error fetching resume details", error);
    }
  }

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    getDetails();
  }, [userId]);

  return (
    <div className="mx-6 w-[70vw] min-h-40 shadow-lg rounded-lg p-6">
      <p className="mb-2 text-white/70 border-b-2 font-bold">Education</p>
      {education.map((edu, i) => (
        <div key={i}>
          <p className="mb-1 text-white/70">{edu.institution}</p>
          <p className="mb-1 text-white/70">{edu.degree}</p>
        </div>
      ))}
      <p className="mb-2 text-white/70 border-b-2 font-bold">Projects</p>
      {projects.map((project, i) => (
        <div key={i}>
          <p className="mb-1 text-white/70">{project.title}</p>
          <p className="mb-1 text-white/70">{project.description}</p>
        </div>
      ))}
      <p className="mb-2 text-white/70 border-b-2 font-bold">Skills</p>
      <div className="flex flex-wrap">
        {skills.map((skill) => (
          <div>
            <Tags key={skill} text={skill} />
          </div>
        ))}
      </div>
      <div className="mt-6">
        <Link to="/resume-edit">
          {userId === localStorage.getItem("id") && <PostBtn text={"edit"} />}
        </Link>
      </div>
    </div>
  );
};
