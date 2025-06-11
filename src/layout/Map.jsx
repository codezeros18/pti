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

import Background from '../assets/background/maps2.png';
import DefaultBackground from '../assets/background/maps2.png'; // Default background
import { useNavigate } from "react-router-dom"; // Add this import

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

// Clamp helper
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const PROXIMITY_RADIUS = 4; // in percent, adjust as needed

const Map = ({
  position = { top: 50, left: 50 },
  direction = "down",
  isMoving = false,
  onLocationClick = () => {},
  viewportWidth = 800,
  viewportHeight = 600,
  customLocations,
  backgroundImage,
  collisionData,
  mapWidth = 1600,   // 🆕 add this
  mapHeight = 1000,  // 🆕 add this
}) => {
  const { selectedCharacter } = useGame();
  const [frame, setFrame] = useState(0);
  const [nearLocation, setNearLocation] = useState(null); // Track nearby location
  const navigate = useNavigate(); // For navigation

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

  const locationsToRender = customLocations || locations;

  // Check proximity on position change
  useEffect(() => {
    const found = locationsToRender.find(loc => {
      const dx = loc.left - position.left;
      const dy = loc.top - position.top;
      return Math.sqrt(dx * dx + dy * dy) <= PROXIMITY_RADIUS;
    });
    setNearLocation(found || null);
  }, [position, locationsToRender]);

  const clampedTop = clamp(position.top, 5, 95);
  const clampedLeft = clamp(position.left, 5, 95);

  const anim = charAnimations[selectedCharacter];
  let charImage = anim.idle;
  if (isMoving && anim[direction]) {
    charImage = anim[direction][frame];
  }

  // Convert position (%) to px
  const playerX = (position.left / 100) * mapWidth;
  const playerY = (position.top / 100) * mapHeight;

  // Calculate camera offset so player is centered
  const maxOffsetX = Math.max(mapWidth - viewportWidth, 0);
  const maxOffsetY = Math.max(mapHeight - viewportHeight, 0);

  const offsetX = clamp(playerX - viewportWidth / 2, 0, maxOffsetX);
  const offsetY = clamp(playerY - viewportHeight / 2, 0, maxOffsetY);

  // Map location name to route path
  const locationRoutes = {
    Home: "/house",
    Beach: "/beach",
    Lake: "/lake",
    Temple: "/temple",
    Mountain: "/mountain",
    Dungeon: "/dungeon",
    Map : "/home",
  };

  // Gunakan backgroundImage prop, fallback ke default
  const bgImage = backgroundImage || DefaultBackground;

  // Gunakan collisionData prop jika ada
  // (bisa diteruskan ke logic collision di parent, atau Map jika perlu)

  return (
    <div
      style={{
        width: viewportWidth,
        height: viewportHeight,
        overflow: 'hidden',
        position: 'relative',
        border: '2px solid #333',
        background: '#000',
        userSelect: 'none', // <-- Prevent selection
        WebkitUserSelect: 'none', // For Safari
        msUserSelect: 'none', // For IE/Edge
      }}
      className="select-none" // If using Tailwind, this also works
    >
      <div
        style={{
          width: mapWidth,
          height: mapHeight,
          position: 'absolute',
          left: -offsetX,
          top: -offsetY,
          backgroundImage: `url(${bgImage})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          transition: 'left 0.1s, top 0.1s',
          userSelect: 'none', // Prevent selection inside map
        }}
        className="select-none"
      >
        {/* Render player */}
        <img
          src={charImage}
          style={{
            position: 'absolute',
            left: playerX,
            top: playerY,
            width: 42,
            height: 42,
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            userSelect: 'none', // Prevent selection on image
          }}
          alt="Player"
          draggable={false} // <-- Prevent drag on image
        />
        {/* Show button if near a location */}
        {nearLocation && (
          <button
            style={{
              position: 'absolute',
              left: playerX - 60, // <-- Place button to the left of the player
              top: playerY,
              transform: 'translate(-50%, -50%)',
              zIndex: 20,
              padding: '8px 16px',
              fontSize: 16,
              background: '#fff',
              border: '2px solid #333',
              borderRadius: 8,
              cursor: 'pointer',
            }}
            onClick={() => {
              if (locationRoutes[nearLocation.name]) {
                navigate(locationRoutes[nearLocation.name]);
              } else {
                onLocationClick(nearLocation);
              }
            }}
          >
            {nearLocation.name}
          </button>
        )}
      </div>
    </div>
  );
};


export default Map;
