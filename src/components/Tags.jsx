import React from 'react'

export const Tags = ({text = ""}) => {
  return (
    <div className='p-1 text-white text-center font-semibold  text-xs bg-black border border-white/50 rounded-xl w-20 capitalize'>
        {text}
    </div>  
  )
}
