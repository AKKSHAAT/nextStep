import React from 'react'
import { JobCard } from '../components/JobCard'

export const JobsList = () => {
  return (
    <div>
      <JobCard organization={"Amazon"} role={"Software engineer intern"}/>
      <JobCard organization={"HP"} role={"product designer"}/>
    </div>
  )
}
