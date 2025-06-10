import React, { useEffect, useState } from 'react';
import temple from '../assets/icon/temple.png';
import home from '../assets/icon/home1.png';
import lake from '../assets/icon/lake1.png';
import mountain from '../assets/icon/mountain1.png';
import beach from '../assets/icon/beach.png';
import dungeon from '../assets/icon/dungeon.png';
import { useGame } from '../GameContext';
import idle1 from '../assets/Char1/Idle.png';
import walkUp1_1 from '../assets/Char1/WalkUp1.PNG';
import walkUp1_2 from '../assets/Char1/WalkUp2.PNG';
import walkUp1_3 from '../assets/Char1/WalkUp3.PNG';
import walkDown1_1 from '../assets/Char1/WalkDown1.PNG';
import walkDown1_2 from '../assets/Char1/WalkDown2.PNG';
import walkDown1_3 from '../assets/Char1/WalkDown3.PNG';
import walkLeft1_1 from '../assets/Char1/WalkLeft1.PNG';
import walkLeft1_2 from '../assets/Char1/WalkLeft2.PNG';
import walkLeft1_3 from '../assets/Char1/WalkLeft3.PNG';
import walkRight1_1 from '../assets/Char1/WalkRight1.png';
import walkRight1_2 from '../assets/Char1/WalkRight2.PNG';
import walkRight1_3 from '../assets/Char1/WalkRight3.PNG';

import idle2 from '../assets/Char2/Idle.png';
import walkUp2_1 from '../assets/Char2/WalkUp1.PNG';
import walkUp2_2 from '../assets/Char2/WalkUp2.PNG';
import walkUp2_3 from '../assets/Char2/WalkUp3.PNG';
import walkDown2_1 from '../assets/Char2/WalkDown1.PNG';
import walkDown2_2 from '../assets/Char2/WalkDown2.PNG';
import walkDown2_3 from '../assets/Char2/WalkDown3.PNG';
import walkLeft2_1 from '../assets/Char2/WalkLeft1.PNG'; 
import walkLeft2_2 from '../assets/Char2/WalkLeft2.PNG';
import walkLeft2_3 from '../assets/Char2/WalkLeft3.PNG';
import walkRight2_1 from '../assets/Char2/WalkRight1.png';
import walkRight2_2 from '../assets/Char2/WalkRight2.PNG';
import walkRight2_3 from '../assets/Char2/WalkRight3.PNG';

import idle3 from '../assets/Char3/Idle.png';
import walkUp3_1 from '../assets/Char3/WalkUp1.PNG';
import walkUp3_2 from '../assets/Char3/WalkUp2.PNG';
import walkUp3_3 from '../assets/Char3/WalkUp3.PNG';
import walkDown3_1 from '../assets/Char3/WalkDown1.PNG';
import walkDown3_2 from '../assets/Char3/WalkDown2.PNG';
import walkDown3_3 from '../assets/Char3/WalkDown3.PNG';
import walkLeft3_1 from '../assets/Char3/WalkLeft1.PNG';
import walkLeft3_2 from '../assets/Char3/WalkLeft2.PNG';
import walkRight3_1 from '../assets/Char3/WalkRight1.png';
import walkRight3_2 from '../assets/Char3/WalkRight2.PNG';

import Background from '../assets/background/backgroundstradew.png';

const charAnimations = [
  // Char1
  {
    idle: idle1,
    up: [walkUp1_1, walkUp1_2, walkUp1_3],
    down: [walkDown1_1, walkDown1_2, walkDown1_3],
    left: [walkLeft1_1, walkLeft1_2, walkLeft1_3],
    right: [walkRight1_1, walkRight1_2, walkRight1_3],
  },
  // Char2
  {
    idle: idle2,
    up: [walkUp2_1, walkUp2_2, walkUp2_3],
    down: [walkDown2_1, walkDown2_2, walkDown2_3],
    left: [walkLeft2_1, walkLeft2_2, walkLeft2_3], // Ganti jika ada PNG
    right: [walkRight2_1, walkRight2_2, walkRight2_3],
  },
  // Char3
  {
    idle: idle3,
    up: [walkUp3_1, walkUp3_2, walkUp3_3],
    down: [walkDown3_1, walkDown3_2, walkDown3_3],
    left: [walkLeft3_1, walkLeft3_2],
    right: [walkRight3_1, walkRight3_2],
  },
];

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

const MAP_WIDTH = 1279; // ganti sesuai ukuran asli gambar
const MAP_HEIGHT = 960; // ganti sesuai ukuran asli gambar

const Map = ({
  position,
  direction,
  isMoving,
  onLocationClick,
  viewportWidth,
  viewportHeight,
}) => {
  const { selectedCharacter } = useGame();
  const [frame, setFrame] = useState(0);

  // Ganti frame setiap 150ms saat bergerak
  useEffect(() => {
    let interval = null;
    if (isMoving) {
      interval = setInterval(() => {
        setFrame((prev) => (prev + 1) % charAnimations[selectedCharacter][direction].length);
      }, 150);
    } else {
      setFrame(0);
    }
    return () => clearInterval(interval);
  }, [isMoving, direction, selectedCharacter]);

  const clampedTop = clamp(position.top, 5, 95);
  const clampedLeft = clamp(position.left, 5, 95);

  const anim = charAnimations[selectedCharacter];
  let charImage = anim.idle;
  if (isMoving && anim[direction]) {
    charImage = anim[direction][frame];
  }

  // Convert position (%) to px
  const playerX = (position.left / 100) * MAP_WIDTH;
  const playerY = (position.top / 100) * MAP_HEIGHT;

  // Calculate camera offset so player is centered
  const maxOffsetX = Math.max(MAP_WIDTH - viewportWidth, 0);
  const maxOffsetY = Math.max(MAP_HEIGHT - viewportHeight, 0);

  const offsetX = clamp(playerX - viewportWidth / 2, 0, maxOffsetX);
  const offsetY = clamp(playerY - viewportHeight / 2, 0, maxOffsetY);

  return (
    <div
      style={{
        width: viewportWidth,
        height: viewportHeight,
        overflow: 'hidden',
        position: 'relative',
        border: '2px solid #333',
        background: '#000',
      }}
    >
      <div
        style={{
          width: MAP_WIDTH,
          height: MAP_HEIGHT,
          position: 'absolute',
          left: -offsetX,
          top: -offsetY,
          backgroundImage: `url(${Background})`,
          backgroundSize: '100% 100%', // supaya gambar tidak kepotong
          backgroundRepeat: 'no-repeat',
          transition: 'left 0.1s, top 0.1s',
        }}
      >
        {/* Render all map elements here */}
        {/* Render player */}
        <img
          src={charImage}
          style={{
            position: 'absolute',
            left: playerX,
            top: playerY,
            width: 42, // or 32
            height: 42, // or 32
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
          }}
          alt="Player"
        />
        {/* Render locations, etc */}
        {locations.map((loc, index) => (
          <img
            key={index}
            src={loc.icon}
            style={{
              position: 'absolute',
              left: (loc.left / 100) * MAP_WIDTH,
              top: (loc.top / 100) * MAP_HEIGHT,
              width: 48,
              height: 48,
              transform: 'translate(-50%, -50%)',
              zIndex: 5,
            }}
            alt={loc.name}
          />
        ))}
      </div>
    </div>
  );
};


export default Map;
