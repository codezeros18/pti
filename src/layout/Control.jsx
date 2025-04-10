import React, { useEffect } from 'react';

const Control = ({ moveCharacter }) => {
  // Handle both arrow keys and WASD
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      switch (key) {
        case 'arrowup':
        case 'w':
          moveCharacter('up');
          break;
        case 'arrowdown':
        case 's':
          moveCharacter('down');
          break;
        case 'arrowleft':
        case 'a':
          moveCharacter('left');
          break;
        case 'arrowright':
        case 'd':
          moveCharacter('right');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [moveCharacter]);

  return (
    <div className="absolute bottom-30 right-0 md:right-10 flex flex-col items-center gap-1 md:gap-2 bg-opacity-80 p-4 rounded-lg z-30">
      <button
        onClick={() => moveCharacter('up')}
        className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-md hover:text-gray-100 cursor-pointer bg-gray-100 hover:bg-gray-900 active:scale-95 transition-all shadow-lg duration-300"
      >
        <i className="fa-solid fa-arrow-up text-gray-700 text-[12px] md:text-2xl"></i>
      </button>
      <div className="flex gap-14">
        <button
          onClick={() => moveCharacter('left')}
          className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-md hover:text-gray-100 cursor-pointer bg-gray-100 hover:bg-gray-900 active:scale-95 transition-all shadow-lg duration-300"
        >
          <i className="fa-solid fa-arrow-left text-gray-700 text-[12px] md:text-2xl"></i>
        </button>
        <button
          onClick={() => moveCharacter('right')}
          className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-md hover:text-gray-100 cursor-pointer bg-gray-100 hover:bg-gray-900 active:scale-95 transition-all shadow-lg duration-300"
        >
          <i className="fa-solid fa-arrow-right text-gray-700 text-[12px] md:text-2xl"></i>
        </button>
      </div>
      <button
        onClick={() => moveCharacter('down')}
        className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-md hover:text-gray-100 cursor-pointer bg-gray-100 hover:bg-gray-900 active:scale-95 transition-all shadow-lg duration-300"
      >
        <i className="fa-solid fa-arrow-down text-gray-700 text-[12px] md:text-2xl"></i>
      </button>
    </div>
  );
};

export default Control;
