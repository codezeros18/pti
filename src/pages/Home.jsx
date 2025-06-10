import React, { useState, useEffect } from 'react';
import Section from '../layout/Section';
import Activities from '../layout/Activities';
import Navbar from '../layout/Navbar';
import Map from '../layout/Map';
import Control from '../layout/Control';
import { usePlayerStatus } from '../PlayerStatusContext';
import GameOver from '../GameOver';
import RandomEventModal from "../components/RandomEventModal";


const Home = () => {
  const { location, resetGame, eventMessage } = usePlayerStatus(); // 🆕 Grab resetGame
  const [position, setPosition] = useState({ top: 50, left: 50 });
  const [activeLocation, setActiveLocation] = useState(null);
  const [direction, setDirection] = useState('down');
  const [isMoving, setIsMoving] = useState(false);
  const [moveDir, setMoveDir] = useState(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // 🆕 Reset game when Home loads (initial mount only)
  useEffect(() => {
    resetGame();
  }, []);

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

  const locationList = [
    { name: 'Dungeon', top: 60, left: 10 },
    { name: 'Mountain', top: 33, left: 25 },
    { name: 'Lake', top: 70, left: 30 },
    { name: 'Temple', top: 50, left: 80 },
    { name: 'Beach', top: 76, left: 50 },
    { name: 'Home', top: 50, left: 50 },
  ];
  
  const checkProximity = (pos) => {
    const threshold = 10;
    for (let loc of locationList) {
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
      const step = customStep ?? 0.2; // Smaller step for slower movement
      const newPosition = { ...prev };
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
      checkProximity(newPosition);
      return newPosition;
    });
  };

  // Add this function to stop walking on key up
  const stopCharacter = () => {
    setIsMoving(false);
    setMoveDir(null); // <-- ini penting!
  };

  const handleLocationHover = (locPos, locName) => {
    const distance = Math.sqrt(
      Math.pow(position.top - locPos.top, 2) + Math.pow(position.left - locPos.left, 2)
    );
    if (distance < 15) {
      setActiveLocation(locName);
    } else {
      setActiveLocation(null);
    }
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

  return (
    <div
      className="w-screen h-screen bg-cover bg-bottom bg-no-repeat font-jersey"
    >
      <RandomEventModal message={eventMessage} />
      <GameOver />
      <Navbar />
      <Activities location={activeLocation ? activeLocation.toLowerCase() : 'who knows where'} />
      <Map
        position={position}
        direction={direction}
        isMoving={isMoving}
        onLocationClick={(loc, name) => handleLocationHover(loc, name)}
        viewportWidth={windowSize.width}
        viewportHeight={windowSize.height}
      />
      <Control setMoveDir={setMoveDir} stopCharacter={stopCharacter} />
      <Section />
    </div>
  );
};

export default Home;
