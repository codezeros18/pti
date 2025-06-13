import React from 'react';

const Control = ({ setMoveDir, stopCharacter }) => {
  return (
    <div className="absolute bottom-24 right-0 md:right-10 flex flex-col items-center md:gap-2 bg-opacity-80 p-4 rounded-lg z-30 select-none">
      <button
        onMouseDown={() => setMoveDir('up')}
        onMouseUp={stopCharacter}
        onMouseLeave={stopCharacter}
        onTouchStart={() => setMoveDir('up')}
        onTouchEnd={stopCharacter}
        className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-md hover:text-gray-100 cursor-pointer bg-[#8B4513] hover:bg-gray-900 active:scale-95 transition-all shadow-lg duration-300"
      >
        <i className="fa-solid fa-arrow-up text-[#f8f8f8] text-[16px] md:text-[20px]"></i>
      </button>
      <div className="flex gap-14">
        <button
          onMouseDown={() => setMoveDir('left')}
          onMouseUp={stopCharacter}
          onMouseLeave={stopCharacter}
          onTouchStart={() => setMoveDir('left')}
          onTouchEnd={stopCharacter}
          className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-md hover:text-gray-100 cursor-pointer bg-[#8B4513] hover:bg-gray-900 active:scale-95 transition-all shadow-lg duration-300"
        >
          <i className="fa-solid fa-arrow-left text-[#f8f8f8] text-[16px] md:text-[20px]"></i>
        </button>
        <button
          onMouseDown={() => setMoveDir('right')}
          onMouseUp={stopCharacter}
          onMouseLeave={stopCharacter}
          onTouchStart={() => setMoveDir('right')}
          onTouchEnd={stopCharacter}
          className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-md hover:text-gray-100 cursor-pointer bg-[#8B4513] hover:bg-gray-900 active:scale-95 transition-all shadow-lg duration-300"
        >
          <i className="fa-solid fa-arrow-right text-[#f8f8f8] text-[16px] md:text-[20px]"></i>
        </button>
      </div>
      <button
        onMouseDown={() => setMoveDir('down')}
        onMouseUp={stopCharacter}
        onMouseLeave={stopCharacter}
        onTouchStart={() => setMoveDir('down')}
        onTouchEnd={stopCharacter}
        className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-md hover:text-gray-100 cursor-pointer bg-[#8B4513] hover:bg-gray-900 active:scale-95 transition-all shadow-lg duration-300"
      >
        <i className="fa-solid fa-arrow-down text-[#f8f8f8] text-[16px] md:text-[20px]"></i>
      </button>
    </div>
  );
};

export default Control;
