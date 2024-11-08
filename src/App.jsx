import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserDash } from "./screens/UserDash";
import { Nav } from "./components/Nav";
import { JobsList } from "./screens/JobsList";
import { CourseList } from "./screens/CourseList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Nav />
        <div className="mx-16">
          <Routes>
            <Route path="/" element={<UserDash />} />
            <Route path="/jobs" element={<JobsList />} />
            <Route path="/upskill" element={<CourseList />} />
            <Route path="/" element={<RDash />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
