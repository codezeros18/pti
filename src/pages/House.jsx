import React, { useState, useEffect } from 'react';
import Section from '../layout/Section';
import Activities from '../layout/Activities';
import Navbar from '../layout/Navbar';
import Map from '../layout/Map';
import Control from '../layout/Control';
import { usePlayerStatus } from '../PlayerStatusContext';
import GameOver from '../GameOver';
import RandomEventModal from "../components/RandomEventModal";
import collisionData from '../collision/housecollision.json';
import houseBg from '../assets/background/house2.png';
import { locationActivities } from "../layout/locationActivities"; // adjust path if needed
import { useNavigate } from 'react-router-dom';

// Define your custom locations here
const customLocations = [
  { name: 'Eat', top: 34, left: 28 },
  { name: 'Take a Bath', top: 38, left: 55 },
  { name: 'Sleep', top: 20, left: 40 },
  { name: 'Do Chores', top: 18, left: 27 },
  { name: 'Map', top: 44, left: 35 },
];

function isWalkable(tileX, tileY) {
  if (
    tileX < 0 || tileX >= 40 ||
    tileY < 0 || tileY >= 30
  ) return false;
  const collisionLayer = collisionData.layers.find(l => l.name === "Collision");
  const idx = tileY * 40 + tileX;
  return collisionLayer.data[idx] === 0;
}

// Converts percent position to tile coordinates
function percentToTile({ top, left }) {
  const x = Math.floor((left / 100) * 40);
  const y = Math.floor((top / 100) * 30);
  return { x, y };
}

const House = () => {
  const { eventMessage, updateStatus, money } = usePlayerStatus();
  const [activityMessage, setActivityMessage] = useState(""); // <-- Add this
  const [position, setPosition] = useState({ top: 38, left: 34 }); // Top right spawn
  const [activeLocation, setActiveLocation] = useState(null);
  const [direction, setDirection] = useState('down');
  const [isMoving, setIsMoving] = useState(false);
  const [moveDir, setMoveDir] = useState(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Proximity check using customLocations
  const checkProximity = (pos) => {
    const threshold = 10;
    for (let loc of customLocations) {
      const distance = Math.sqrt(
        Math.pow(pos.top - loc.top, 2) + Math.pow(pos.left - loc.left, 2)
      );
      if (distance < threshold) {
        setActiveLocation(loc.name);
        return;
      }
    }
    setActiveLocation(null);
  };  

  const moveCharacter = (dir, customStep) => {
    setDirection(dir);
    setIsMoving(true);
    setPosition((prev) => {
      const step = customStep ?? 0.2;
      let newPosition = { ...prev };
      switch (dir) {
        case 'up':
          newPosition.top = Math.max(prev.top - step, 0);
          break;
        case 'down':
          newPosition.top = Math.min(prev.top + step, 100);
          break;
        case 'left':
          newPosition.left = Math.max(prev.left - step, 0);
          break;
        case 'right':
          newPosition.left = Math.min(prev.left + step, 100);
          break;
        default:
          break;
      }
      // Collision check
      const { x, y } = percentToTile(newPosition);
      if (!isWalkable(x, y)) {
        return prev; // Block movement if not walkable
      }
      checkProximity(newPosition);
      return newPosition;
    });
  };

  // Add this function to stop walking on key up
  const stopCharacter = () => {
    setIsMoving(false);
    setMoveDir(null); // <-- ini penting!
  };

  useEffect(() => {
    let animationId;

    const moveLoop = () => {
      if (moveDir) {
        moveCharacter(moveDir); // Move every frame with small step
        animationId = requestAnimationFrame(moveLoop);
      }
    };

    const handleKeyDown = (e) => {
      let dir = null;
      switch (e.key.toLowerCase()) {
        case 'arrowup':
        case 'w': dir = 'up'; break;
        case 'arrowdown':
        case 's': dir = 'down'; break;
        case 'arrowleft':
        case 'a': dir = 'left'; break;
        case 'arrowright':
        case 'd': dir = 'right'; break;
        default: break;
      }
      if (dir && moveDir !== dir) {
        setMoveDir(dir);
      }
    };

    const handleKeyUp = (e) => {
      let dir = null;
      switch (e.key.toLowerCase()) {
        case 'arrowup':
        case 'w': dir = 'up'; break;
        case 'arrowdown':
        case 's': dir = 'down'; break;
        case 'arrowleft':
        case 'a': dir = 'left'; break;
        case 'arrowright':
        case 'd': dir = 'right'; break;
        default: break;
      }
      if (dir && moveDir === dir) {
        setMoveDir(null);
      }
    };

    if (moveDir) {
      animationId = requestAnimationFrame(moveLoop);
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationId);
    };
  }, [moveDir]);

  useEffect(() => {
    if (!moveDir) setIsMoving(false);
  }, [moveDir]);

  // Handler for when "Enter" button is clicked
  const handleLocationClick = (loc) => {
    // Find the activity for this location
    const activity = locationActivities.home.find(
      (a) => a.name.toLowerCase() === loc.name.toLowerCase()
    );
    if (activity) {
      const cost = activity.effect.money && activity.effect.money < 0 ? -activity.effect.money : 0;
      if (money >= cost) {
        updateStatus(activity.effect);
        setActivityMessage(activity.benefit || "Action performed!");
      } else {
        setActivityMessage("Not enough money!");
      }
      setTimeout(() => setActivityMessage(""), 1500);
    }
  };

  return (
    <div
      className="w-screen h-screen bg-cover bg-bottom bg-no-repeat font-jersey"
    >
      <RandomEventModal message={eventMessage} />
      <GameOver />
      <Navbar />
      {/* Feedback message */}
      {activityMessage && (
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 bg-yellow-200 text-[#255C4E] px-4 py-2 rounded shadow-lg z-50">
          {activityMessage}
        </div>
      )}
      <Activities location={activeLocation ? activeLocation.toLowerCase() : 'house'} />
      <Map
        customLocations={customLocations}
        position={position}
        direction={direction}
        isMoving={isMoving}
        onLocationClick={handleLocationClick}
        viewportWidth={windowSize.width}
        viewportHeight={windowSize.height}
        backgroundImage={houseBg}
        collisionData={collisionData}
        mapWidth={1600}
        mapHeight={1000}
      />
      <Control setMoveDir={setMoveDir} stopCharacter={stopCharacter} />
      <Section />
    </div>
  );
};

export default House;
