import React from 'react'

export const Tags = ({text = ""}) => {
  return (
    <div className='p-1 text-center font-semibold  text-xs bg-fuchsia-200 rounded-xl w-20 capitalize'>
        {text}
    </div>  
  )
}
