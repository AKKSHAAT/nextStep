import React, { useState } from 'react';
import axios from '../axios.js';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ResumeForm = () => {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState(localStorage.getItem('id'));
  const [education, setEducation] = useState([{ institution: '', degree: '' }]);
  const [projects, setProjects] = useState([{ title: '', description: '', technologies: '', link: '' }]);
  const [skills, setSkills] = useState(['']);

  const handleAddEducation = () => {
    setEducation([...education, { institution: '', degree: '' }]);
  };

  const handleAddProject = () => {
    setProjects([...projects, { title: '', description: '', technologies: '', link: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Convert the skills to an array if it's a string
    const formattedSkills = skills
      .map((skill) => skill.trim()) // Trim any extra spaces
      .filter((skill) => skill.length > 0); // Remove empty strings
  
    const resumeData = { studentId, education, projects, skills: formattedSkills };
  
    try {
      const response = await axios.post('/api/resume/create', resumeData);
      alert("Resume submitted successfully!");
      navigate(`/dashboard/${studentId}`);
    } catch (error) {
      console.error("Error submitting resume", error);
      alert("Failed to submit resume.");
    }
  };

  async function getDetails() {
    const res = await axios.get(`api/resume/student/${studentId}`);
    console.log("res: ", res.data);
    if(res.data.education) setEducation(res.data.education);
    if(res.data.projects) setProjects(res.data.projects);
    if(res.data.skills) setSkills(res.data.skills);
  }

  useEffect(()=>{
    if(localStorage.getItem("rec")) {
      navigate('/');
    }
    getDetails();
    if(!localStorage.getItem('id')) navigate('/login');
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="p-8 rounded-md shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Add to your Next-Resume</h2>
        <p className=" text-center mb-6 capitalize">And forget about dealing with Applicant Tracking Systems</p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Education</h3>
            {education.map((edu, index) => (
              <div key={index} className="space-y-2 mb-4">
                <input
                  type="text"
                  placeholder="Institution"
                  value={edu.institution}
                  onChange={(e) => {
                    const newEducation = [...education];
                    newEducation[index].institution = e.target.value;
                    setEducation(newEducation);
                  }}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md"
                  required
                />
                <input
                  type="text"
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => {
                    const newEducation = [...education];
                    newEducation[index].degree = e.target.value;
                    setEducation(newEducation);
                  }}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md"
                  required
                />
              </div>
            ))}
            <button type="button" onClick={handleAddEducation} className="w-full p-2 bg-blue-600 rounded-md mb-4">
              +
            </button>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold mb-2">Projects</h3>
            {projects.map((project, index) => (
              <div key={index} className="space-y-2 mb-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={project.title}
                  onChange={(e) => {
                    const newProjects = [...projects];
                    newProjects[index].title = e.target.value;
                    setProjects(newProjects);
                  }}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md"
                  required
                />
                <textarea
                  placeholder="Description"
                  value={project.description}
                  onChange={(e) => {
                    const newProjects = [...projects];
                    newProjects[index].description = e.target.value;
                    setProjects(newProjects);
                  }}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md"
                  required
                />
                <input
                  type="text"
                  placeholder="Technologies (comma-separated)"
                  value={project.technologies}
                  onChange={(e) => {
                    const newProjects = [...projects];
                    newProjects[index].technologies = e.target.value;
                    setProjects(newProjects);
                  }}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md"
                  required
                />
                <input
                  type="text"
                  placeholder="Project Link"
                  value={project.link}
                  onChange={(e) => {
                    const newProjects = [...projects];
                    newProjects[index].link = e.target.value;
                    setProjects(newProjects);
                  }}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md"
                  required
                />
              </div>
            ))}
            <button type="button" onClick={handleAddProject} className="w-full p-2 bg-blue-600 rounded-md mb-4">
              +
            </button>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold mb-2">Skills</h3>
            {skills.map((skill, index) => (
              <input
                key={index}
                type="text"
                placeholder="Skill"
                value={skill}
                onChange={(e) => {
                  const newSkills = [...skills];
                  newSkills[index] = e.target.value;
                  setSkills(newSkills);
                }}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md mb-2"
                required
              />
            ))}
            <button
              type="button"
              onClick={() => setSkills([...skills, ''])}
              className="w-full p-2 bg-blue-600 rounded-md"
            >
              +
            </button>
          </div>

          <button type="submit" className="w-full p-3 bg-green-600 rounded-md font-semibold mt-4">
            Submit Resume
          </button>
        </form>
      </div>
    </div>
  );
};
export default ResumeForm;
