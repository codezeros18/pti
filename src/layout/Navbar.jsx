import React from 'react'
import Background from '../assets/paper/4.png'

const Navbar = () => {
  return (
    <>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-11/12 md:max-w-2xl z-50">
            <div className="flex flex-col justify-center items-center bg-white px-6 py-1 md:py-2 my-4 rounded-full shadow-md">
                <h1 className='bg-gradient-to-r from-[#255C4E] to-[#61A6C0] text-transparent bg-clip-text text-[20px] md:text-3xl font-extrabold'>Ucup Menjelajah Nusantara</h1>
            </div>
        </div>
    </>
  )
}

export default Navbar
