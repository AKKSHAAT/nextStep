import { useState } from "react";
import axios from "../axios.js";

const StudentRegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const studentData = {
      email,
      password,
      name,
      profilePicture,
    };

    try {
      const response = await axios.post("/api/students/register", { studentData });
      console.log(res);

      const data = await response.json();
      if (response.status === 201) {
        setMessage("Student registered successfully");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error(error);
      setMessage("Server error. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl text-white mb-6 text-center">
          Student Registration
        </h2>
        {message && <p className="text-center text-white mb-4">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white">Name</label>
            <input
              type="text"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 mt-1 rounded-lg bg-gray-700 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-white">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-1 rounded-lg bg-gray-700 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-white">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-1 rounded-lg bg-gray-700 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-white">Profile Picture (URL)</label>
            <input
              type="string"
              value={profilePicture}
              name="profilePicture"
              onChange={(e) => setProfilePicture(e.target.value)}
              className="w-full p-3 mt-1 rounded-lg bg-gray-700 text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentRegisterForm;
