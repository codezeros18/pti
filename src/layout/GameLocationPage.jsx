import React, { useState, useEffect } from 'react';
import Section from '../layout/Section';
import Activities from '../layout/Activities';
import Navbar from '../layout/Navbar';
import Map from '../layout/Map';
import Control from '../layout/Control';
import { usePlayerStatus } from '../PlayerStatusContext';
import GameOver from '../GameOver';
import RandomEventModal from "../components/RandomEventModal";
import ActivityModal from '../components/ActivityModal';
import hikeGif from '../assets/animation/hike.gif';

const INVENTORY_LIMIT = 3;

const isBuyAction = (action) =>
  action.name.toLowerCase().includes("buy") ||
  action.name.toLowerCase().includes("potion") ||
  action.name.toLowerCase().includes("snack") ||
  action.name.toLowerCase().includes("souvenir");

function isWalkable(tileX, tileY, collisionData) {
  if (
    tileX < 0 || tileX >= 40 ||
    tileY < 0 || tileY >= 30
  ) return false;
  const collisionLayer = collisionData.layers.find(l => l.name === "Collision");
  const idx = tileY * 40 + tileX;
  return collisionLayer.data[idx] === 0;
}

function percentToTile({ top, left }) {
  const x = Math.floor((left / 100) * 40);
  const y = Math.floor((top / 100) * 30);
  return { x, y };
}

const GameLocationPage = ({
  locationKey,
  customLocations,
  collisionData,
  backgroundImage,
  activitiesKey,
  startPosition = { top: 20, left: 60 }
}) => {
  const { eventMessage, updateStatus, money, addItem, inventory } = usePlayerStatus();
  const [position, setPosition] = useState(startPosition);
  const [activeLocation, setActiveLocation] = useState(null);
  const [direction, setDirection] = useState('down');
  const [isMoving, setIsMoving] = useState(false);
  const [moveDir, setMoveDir] = useState(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [activityMessage, setActivityMessage] = useState("");
  const [currentActivity, setCurrentActivity] = useState(null);
  const [fastForward, setFastForward] = useState(false);
  const [completed, setCompleted] = useState(false);

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
      if (!isWalkable(x, y, collisionData)) {
        return prev;
      }
      checkProximity(newPosition);
      return newPosition;
    });
  };

  const stopCharacter = () => {
    setIsMoving(false);
    setMoveDir(null);
  };

  useEffect(() => {
    let animationId;

    const moveLoop = () => {
      if (moveDir) {
        moveCharacter(moveDir);
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

  useEffect(() => {
    setCompleted(false);
    setFastForward(false);
  }, [currentActivity]);

  const handleActivityClick = (activity) => {
    setFastForward(false);
    if (
      isBuyAction(activity) &&
      inventory.length >= INVENTORY_LIMIT
    ) {
      alert("Inventory Full!");
      return;
    }
    setCurrentActivity({
      ...activity,
      duration: activity.duration || 10,
      animation: activity.animation || hikeGif,
    });
  };

  const handleComplete = () => {
    if (completed) return;
    setCompleted(true);

    if (currentActivity && currentActivity.effect) {
      if (isBuyAction(currentActivity)) {
        addItem({
          name: currentActivity.name,
          effect: { ...currentActivity.effect, money: 0 },
          icon: currentActivity.icon,
          benefit: currentActivity.benefit,
        });
        updateStatus({ money: currentActivity.effect.money });
      } else {
        updateStatus(currentActivity.effect);
      }
    }
    setCurrentActivity(null);
    setFastForward(false);
  };

  // Handler for when "Enter" button is clicked (optional)
  const handleLocationClick = (loc) => {
    const activity = activitiesKey.find(
      (a) => a.name.toLowerCase() === loc.name.toLowerCase()
    );
    if (activity) {
      handleActivityClick(activity);
    }
  };

  return (
    <div className="w-screen h-screen bg-cover bg-bottom bg-no-repeat font-jersey">
      <RandomEventModal message={eventMessage} />
      <GameOver />
      <Navbar />
      <Activities
        location={activeLocation ? activeLocation.toLowerCase() : locationKey}
        onActivityClick={handleActivityClick}
      />
      <Map
        customLocations={customLocations}
        position={position}
        direction={direction}
        isMoving={isMoving}
        onLocationClick={handleLocationClick}
        viewportWidth={windowSize.width}
        viewportHeight={windowSize.height}
        backgroundImage={backgroundImage}
        collisionData={collisionData}
        mapWidth={1600}
        mapHeight={1000}
      />
      <Control setMoveDir={setMoveDir} stopCharacter={stopCharacter} />
      <Section />
      {currentActivity && (
        <ActivityModal
          activity={currentActivity}
          fastForward={fastForward}
          setFastForward={setFastForward}
          onComplete={handleComplete}
        />
      )}
    </div>
  );
};

export default GameLocationPage;