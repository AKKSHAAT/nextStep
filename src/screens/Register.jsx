import React, { useState } from "react";
import axios from "../axios.js";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm password field
  const [isRecruiter, setIsRecruiter] = useState(false);
  const [companyName, setCompanyName] = useState(""); // For recruiters
  const [jobRole, setJobRole] = useState(""); // For students
  const [profilePicture, setProfilePicture] = useState(""); // Optional profile picture
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }
  
    const studentData = { email, password, jobRole, profilePicture };
  
    try {
      const response = await axios.post("http://localhost:6969/api/student/register", studentData, {
        headers: { "Content-Type": "application/json" },
      });
      if(response.status === 201) {
        navigate("/login");
      }
      console.log(response.status); // Log the successful response
      // Continue with success actions (navigate or show success message)
    } catch (err) {
      console.error(err.response?.data); // Log any error from the response
      setError("Registration failed. Please try again.");
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md p-6 bg-black text-white border border-white/40 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-black text-white ring-white/30 rounded-md border border-white-60 text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-black text-white ring-white/30 rounded-md border border-white-60 text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 bg-black text-white ring-white/30 rounded-md border border-white-60 text-white"
              required
            />
          </div>

          {isRecruiter ? (
            <div className="mb-4">
              <label htmlFor="companyName" className="block text-sm font-medium mb-2">
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full p-3 bg-black text-white ring-white/30 rounded-md border border-white-60 text-white"
                required
              />
            </div>
          ) : (
            <div className="mb-4">
              <label htmlFor="jobRole" className="block text-sm font-medium mb-2">
                Job Role
              </label>
              <input
                type="text"
                id="jobRole"
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
                className="w-full p-3 bg-black text-white ring-white/30 rounded-md border border-white-60 text-white"
                required
              />
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="profilePicture" className="block text-sm font-medium mb-2">
              Profile Picture (optional)
            </label>
            <input
              type="text"
              id="profilePicture"
              value={profilePicture}
              onChange={(e) => setProfilePicture(e.target.value)}
              className="w-full p-3 bg-black text-white ring-white/30 rounded-md border border-white-60 text-white"
            />
          </div>

          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              id="isRecruiter"
              checked={isRecruiter}
              onChange={() => setIsRecruiter(!isRecruiter)} // Toggle between recruiter/student
              className="mr-2"
            />
            <label htmlFor="isRecruiter" className="text-sm font-medium">
              Register as Recruiter
            </label>
          </div>

          <button
            type="submit"
            className="w-40 p-3 bg-black border border-white-60 rounded-md text-white font-semibold disabled:bg-gray-600"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
