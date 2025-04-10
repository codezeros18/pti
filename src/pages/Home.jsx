import React, { useState, useEffect } from 'react';
import Background from '../assets/background/6.png';
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

  // 🆕 Reset game when Home loads (initial mount only)
  useEffect(() => {
    resetGame();
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

  const moveCharacter = (direction) => {
    setPosition((prev) => {
      const step = 5;
      const newPosition = { ...prev };
  
      switch (direction) {
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

  return (
    <div
      className="w-screen h-screen bg-cover bg-bottom bg-no-repeat font-jersey"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <RandomEventModal message={eventMessage} />
      <GameOver />
      <Navbar />
      <Activities location={activeLocation ? activeLocation.toLowerCase() : 'who knows where'} />
      <Map
        position={position}
        onLocationClick={(loc, name) => handleLocationHover(loc, name)}
      />
      <Control moveCharacter={moveCharacter} />
      <Section />
    </div>
  );
};

export default Home;
