import React from 'react'

const SkeltonSettings = () => {
  return (
    <>
      <div className='h-10 w-full md:w-1/4 animate-pulse bg-slate-500/20'></div>
      <hr className='border-b-2 border-gray-300 m-2'/>
      <div className='h-10 w-full md:w-2/4 animate-pulse bg-slate-500/20'></div>
      <div className='h-8 w-full md:w-1/4 mt-2 animate-pulse bg-slate-500/20'></div>
      <div className='h-8 w-full md:w-1/4  mt-2 animate-pulse bg-slate-500/20'></div>
      <div className='h-80 w-full md:w-2/4  mt-2 animate-pulse bg-slate-500/20'></div>
    </>
  )
}

export default SkeltonSettings