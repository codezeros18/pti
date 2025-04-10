import React, { createContext, useContext, useEffect, useState } from "react";

const MAX_STAT = 100;
const MIN_STAT = 0;

const defaultStatus = {
  hunger: 50,
  energy: 50,
  happiness: 50,
  hygiene: 50,
  money: 0,
  day: 1,
  time: 8,
  job: null,
  location: "home",
  position: { x: 1, y: 1 },
  playerName: "",
  selectedChar: 0,
  gameOver: false,
};

const PlayerStatusContext = createContext(null);

export const usePlayerStatus = () => {
  const context = useContext(PlayerStatusContext);
  if (!context) throw new Error("usePlayerStatus must be used within PlayerStatusProvider");
  return context;
};

export const PlayerStatusProvider = ({ children }) => {
  const [status, setStatus] = useState(() => {
    const stored = localStorage.getItem("playerStatus");
    return stored ? JSON.parse(stored) : defaultStatus;
  });

  const [gameOver, setGameOver] = useState(false);
  const [eventMessage, setEventMessage] = useState(null);
  const [eventTimeout, setEventTimeout] = useState(null); // 🆕 for managing timeout

  const MAP_WIDTH = 3;
  const MAP_HEIGHT = 3;

  const updatePosition = (direction) => {
    setStatus((prev) => {
      let { x, y } = prev.position;

      switch (direction) {
        case "up": y--; break;
        case "down": y++; break;
        case "left": x--; break;
        case "right": x++; break;
        default: break;
      }

      x = Math.max(0, Math.min(MAP_WIDTH - 1, x));
      y = Math.max(0, Math.min(MAP_HEIGHT - 1, y));

      const locationMap = [
        ["forest", "temple", "dungeon"],
        ["shop", "home", "school"],
        ["lake", "market", "park"]
      ];

      const newLocation = locationMap[y][x];

      return {
        ...prev,
        position: { x, y },
        location: newLocation,
      };
    });
  };

  const updateStatus = (effect) => {
    setStatus(prev => {
      const cost = effect.money && effect.money < 0 ? -effect.money : 0;

      if (cost > 0 && prev.money < cost) {
        console.log("🚫 Not enough money!");
        return prev;
      }

      const updated = { ...prev };

      for (const key in effect) {
        if (typeof effect[key] === "number") {
          if (key === "money") {
            updated[key] = prev[key] + effect[key];
          } else {
            updated[key] = clamp(prev[key] + effect[key]);
          }
        } else {
          updated[key] = effect[key];
        }
      }

      return updated;
    });
  };

  const resetGame = () => {
    localStorage.removeItem("playerStatus");

    setStatus((prev) => {
      const newStatus = {
        ...defaultStatus,
        playerName: prev.playerName,
        selectedChar: prev.selectedChar,
      };
      localStorage.setItem("playerStatus", JSON.stringify(newStatus));
      return newStatus;
    });

    setGameOver(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(prev => {
        const newTime = (prev.time + 1) % 24;
        const newDay = prev.day + (newTime === 0 ? 1 : 0);

        let updatedStatus = {
          ...prev,
          hunger: clamp(prev.hunger - 0.3),
          energy: clamp(prev.energy - 0.2),
          happiness: clamp(prev.happiness - 0.1),
          hygiene: clamp(prev.hygiene - 0.15),
          time: newTime,
          day: newDay,
        };

        // 🔄 Random event logic (20% chance every 3s)
        if (Math.random() < 0.05) {
          const event = triggerRandomEvent();
          console.log("🌟 Event triggered:", event.message);
          setEventMessage(event.message);

          if (eventTimeout) clearTimeout(eventTimeout);
          const timeout = setTimeout(() => setEventMessage(null), 4000);
          setEventTimeout(timeout);

          // Apply event effect directly to updatedStatus
          for (const key in event.effect) {
            const value = event.effect[key];
            if (typeof value === "number") {
              if (key === "money") {
                updatedStatus[key] = (updatedStatus[key] || 0) + value;
              } else {
                updatedStatus[key] = clamp((updatedStatus[key] || 0) + value);
              }
            } else {
              updatedStatus[key] = value;
            }
          }
        }


        // 💀 Game Over Check
        if (
          updatedStatus.hunger <= 0 ||
          updatedStatus.energy <= 0 ||
          updatedStatus.happiness <= 0 ||
          updatedStatus.hygiene <= 0
        ) {
          localStorage.removeItem("playerStatus");
          setGameOver(true);

          return {
            ...defaultStatus,
            playerName: prev.playerName,
            selectedChar: prev.selectedChar,
          };
        }

        return updatedStatus;
      });
    }, 3000); // ⏱ Faster interval (3 seconds)

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!gameOver) {
      localStorage.setItem("playerStatus", JSON.stringify(status));
    }
  }, [status, gameOver]);

  return (
    <PlayerStatusContext.Provider
      value={{
        ...status,
        updateStatus,
        updatePosition,
        gameOver,
        setGameOver,
        resetGame,
        eventMessage,
      }}
    >
      {children}
    </PlayerStatusContext.Provider>
  );
};

const clamp = (value, min = MIN_STAT, max = MAX_STAT) => Math.min(max, Math.max(min, value));

const triggerRandomEvent = () => {
  const events = [
    {
      message: "It rained unexpectedly. You got wet!",
      effect: { hygiene: -3 },
    },
    {
      message: "You found money on the ground!",
      effect: { money: +50 },
    },
    {
      message: "You got a bit lost and tired.",
      effect: { energy: -2, happiness: -2 },
    },
    {
      message: "Someone offered you a meal!",
      effect: { hunger: +10 },
    },
  ];
  return events[Math.floor(Math.random() * events.length)];
};
