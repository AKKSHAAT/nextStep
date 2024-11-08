import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserDash } from "./screens/UserDash";
import { Nav } from "./components/Nav";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Nav />
        <div className="mx-16">
          <Routes>
            <Route path="/" element={<UserDash />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
