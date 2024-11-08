import React, { useState } from "react";
import axios from "../axios.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRecruiter, setIsRecruiter] = useState(false); // State for Recruiter/Student choice
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if both fields are filled
    if (!email || !password) {
      setError("Please fill in both fields");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // Update API endpoint based on whether the user is a student or recruiter
      const endpoint = isRecruiter
        ? "/api/recruiter/login"
        : "/api/student/login";
      const res = await axios.post(endpoint, { email, password });

      if (res.status === 200 && res.data.token) {
        // Save the token and user data in localStorage
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("email", res.data.email);

        if (res.data.rec) {
          localStorage.setItem("rec", true);
          
          navigate(`/recruiter/${res.data.id}`);
        } else {
          navigate(`/dashboard/${res.data.id}`);
        }
        // Navigate to the respective dashboard
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

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
              className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 text-white"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 text-white"
              required
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
              Login as Recruiter
            </label>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-600 rounded-md text-white font-semibold disabled:bg-gray-600"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
