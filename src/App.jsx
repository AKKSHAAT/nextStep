import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { UserDash } from "./screens/UserDash";
import { Nav } from "./components/Nav";
import { JobsList } from "./screens/JobsList";
import { CourseList } from "./screens/CourseList";
import {RDash} from "./screens/RDash";

import { Community } from "./screens/Community";
import { CommentSection } from "./screens/CommentSection";

import Login from "./screens/Login";
import ResumeForm from "./screens/ResumeForm";
import JobPostingForm from "./screens/JobPostingForm";
import AMAForm from "./screens/AMAForm";
import Register from './screens/Register';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Nav />
        <div className="mx-16">
          <Routes>
            <Route path="/dashboard/:id" element={<UserDash />} />
            <Route path="/jobs" element={<JobsList />} />
            <Route path="/community" element={<Community />} />
            <Route path="/upskill" element={<CourseList />} />
            <Route path="/recruiter/:id" element={<RDash />} />
            <Route path="/resume-edit" element={<ResumeForm />}/>
            <Route path="/" element={<Navigate to="/jobs" />} />
            <Route path="/r-jobs/:id" element={<JobsList />}/>
            <Route path="/post-job/:id" element={<JobPostingForm />}/>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/post/comments/:id" element={<CommentSection />} />
            <Route path="/ama-form" element={<AMAForm />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;