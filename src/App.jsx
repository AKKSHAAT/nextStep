import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserDash } from "./screens/UserDash";
import { Nav } from "./components/Nav";
import { JobsList } from "./screens/JobsList";
import { CourseList } from "./screens/CourseList";
import {RDash} from "./screens/RDash";

import { Community } from "./screens/Community";

import Login from "./screens/Login";

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


            <Route path="/login" element={<Login />} />

          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;