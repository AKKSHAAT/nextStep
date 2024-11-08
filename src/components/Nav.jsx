import React from 'react'
import { Link } from 'react-router-dom'

export const Nav = () => {
  return (
    <div className='flex bg-white gap-8  p-6 justify-center shadow-xl font-bold text-md'>
    <Link to={'/communtiy'}>Community</Link>
    <Link to={'/Jobs'}>Jobs</Link>
    <Link to={'/upskill '}>Upskill</Link>
    </div>
  )
}
