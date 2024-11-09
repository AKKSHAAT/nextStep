import React from "react";
import { JobCard } from "../components/JobCard";
import { useEffect } from "react";
import axios from "../axios";
import { useParams } from "react-router-dom";
import { useState } from "react";

export const JobsList = () => {
  const { id } = useParams();
  const [jobs, setJobs] = useState([]);

  async function fetchjobs() {
    if(id){
      const res = await axios.get(`/api/jobs/${id}`);
      setJobs(res.data);
    } else {
      const res = await axios.get(`/api/jobs/`);
      setJobs(res.data);
      console.log("jobs: ", res.data);
    }
  }

  useEffect(() => {
    fetchjobs();
  }, []);

  return (
    <div>
      {jobs.map((job, i) => (
        <JobCard key={i} organization={job.companyName} role={job.title} skills={job.skills} id={job._id}/>
      ))}
    </div>
  );
};
