import React from 'react'
import background from '../assets/background2/1.png'
import CharaSelector from '../components/CharaSelector'
import background1 from '../assets/paper/1.png'
import cloud from '../assets/background2/2.png'

const Character = () => {
  return (
    <div className="w-screen h-screen bg-cover bg-center bg-no-repeat z-10" style={{ backgroundImage: `url(${background})` }}>
      <div className="absolute top-0 left-0 w-full h-full z-0"> 
        <img
          src={cloud}
          alt="Cloud Background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex justify-center items-center h-screen relative z-10">
        <div
          className="w-[80vh] h-[80vh] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${background1})` }}
        >
          <CharaSelector />
        </div>
      </div>
    </div>
  )
}

export default Character
