import React, { useState } from 'react';
import axios from '../axios.js';
import { useParams } from 'react-router-dom';

const JobPostingForm = () => {
  const {id} = useParams();
  const [title, setTitle] = useState('');
  const [students, setStudents] = useState('');
  const [recruiterId, setRecruiterId] = useState(id);
  const [companyName, setCompanyName] = useState('');
  const [skills, setSkills] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jobData = {
      title,
      students: students.split(',').map((student) => student.trim()), 
      recruiterId,
      companyName,
      skills: skills.split(',').map((skill) => skill.trim()), 
    };

    try {
      const response = await axios.post('/api/jobs', jobData);
      setMessage('Job posted successfully!');
      console.log(response.data);
    } catch (error) {
      setMessage('Error posting job.');
      console.error(error);
    }
  };

  return (
    <div className="text-white min-h-screen px-4 w-[50vw] mx-auto">
      <div className="max-w-4xl mx-auto p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-2 text-center">Post a Job</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="title" className="block text-lg font-medium mb-2">Job Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 bg-black text-white rounded-md focus:outline-none ring-2 ring-white/30"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="companyName" className="block text-lg font-medium mb-2">Company Name:</label>
            <input
              type="text"
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full p-2 bg-black text-white rounded-md focus:outline-none ring-2 ring-white/30"
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="skills" className="block text-lg font-medium mb-2">Skills (Comma Separated):</label>
            <input
              type="text"
              id="skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g. JavaScript, Node.js, React"
              className="w-full p-2 bg-black text-white rounded-md focus:outline-none ring-2 ring-white/30"
              required
            />
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="w-40 py-2 bg-white/30 text-white font-semibold rounded-md hover:bg-white/20 transition duration-200"
            >
              Post Job
            </button>
          </div>
        </form>

        {message && (
          <p className={`mt-4 text-center ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default JobPostingForm;
