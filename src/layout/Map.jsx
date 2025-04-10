import React from 'react';
import temple from '../assets/icon/temple.png';
import home from '../assets/icon/home1.png';
import lake from '../assets/icon/lake1.png';
import mountain from '../assets/icon/mountain1.png';
import beach from '../assets/icon/beach.png';
import dungeon from '../assets/icon/dungeon.png';
import { useGame } from '../GameContext';
import char1 from '../assets/char/char1.png';
import char2 from '../assets/char/char3.png';
import char3 from '../assets/char/char4.png';
import char4 from '../assets/char/char5.png';

const charImages = [char1, char2, char3, char4];

// All values in % from the top-left corner
const locations = [
  { name: 'Dungeon', icon: dungeon, top: 60, left: 10 },
  { name: 'Mountain', icon: mountain, top: 33, left: 25 },
  { name: 'Lake', icon: lake, top: 70, left: 30 },
  { name: 'Temple', icon: temple, top: 50, left: 80 },
  { name: 'Beach', icon: beach, top: 76, left: 50 },
  { name: 'Home', icon: home, top: 50, left: 50 },
];

// Clamp helper
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const Map = ({ position, onLocationClick }) => {
  const { selectedCharacter } = useGame();

  const clampedTop = clamp(position.top, 5, 95);
  const clampedLeft = clamp(position.left, 5, 95);

  return (
    <div className="relative w-full h-screen flex justify-center items-center overflow-hidden">
      {/* Character */}
      <img
        src={charImages[selectedCharacter]}
        className="absolute w-8 md:w-10 h-auto transition-all duration-300 z-20"
        style={{
          top: `${clampedTop}%`,
          left: `${clampedLeft}%`,
          transform: 'translate(-50%, -50%)',
        }}
        alt="Character"
      />

      {/* Locations */}
      {locations.map((loc, index) => (
        <div
        key={index}
        className="absolute z-10 cursor-pointer"
        style={{
          top: `${loc.top}%`,
          left: `${loc.left}%`,
        }}
      >
        <img
          src={loc.icon}
          className="w-12 h-12 hover:scale-110 transition-transform duration-200"
          alt={loc.name}
        />
      </div>
      
      ))}
    </div>
  );
};


export default Map;
