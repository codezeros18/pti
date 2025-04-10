// context/GameContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [playerName, setPlayerName] = useState(() => localStorage.getItem("playerName") || "");
  const [selectedCharacter, setSelectedCharacter] = useState(() => {
    const stored = localStorage.getItem("selectedCharacter");
    return stored !== null ? parseInt(stored, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem("playerName", playerName);
  }, [playerName]);

  useEffect(() => {
    localStorage.setItem("selectedCharacter", selectedCharacter);
  }, [selectedCharacter]);

  return (
    <GameContext.Provider
      value={{ playerName, setPlayerName, selectedCharacter, setSelectedCharacter }}
    >
      {children}
    </GameContext.Provider>
  );
};
