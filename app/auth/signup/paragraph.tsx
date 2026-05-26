import React from 'react'

export default function Paragraph() {
  return (
    <div className='w-full lg:w-1/2 px-6 py-10 flex flex-col justify-center gap-10 text-white z-10'>
        <h1 className='text-6xl tracking-wider font-extrabold leading-tight'>
            <span className='text-white'>Welcome </span><span className='text-white/80'>To</span>
            <br />
            <span className='text-cyan-400'>Auto</span><span className='text-purple-400'>Tracks</span>
            <br />
            <span className='text-white/70 text-4xl font-bold'>Cars factory</span>
        </h1>
        <p className='text-white/70 text-lg leading-relaxed max-w-lg'>
             AutoTracks is the leading solution for automating and managing industrial car manufacturing processes. Our platform ensures precise control and monitoring of operations, maximizing efficiency and productivity. Join us and drive your factory into the future of automation.
        </p>
    </div>
  )
}
