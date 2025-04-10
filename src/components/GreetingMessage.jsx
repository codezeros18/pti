import React from "react";
import { usePlayerStatus } from "../PlayerStatusContext";

const GreetingMessage = () => {
  const { playerName, time } = usePlayerStatus();

  const getTimeGreeting = () => {
    if (time >= 5 && time < 12) return "Good morning";
    if (time >= 12 && time < 18) return "Good afternoon";
    if (time >= 18 && time < 22) return "Good evening";
    return "Good night";
  };

  return (
    <h1 className="text-[20px] font-bold text-white">
      {getTimeGreeting()}, {playerName || "Stranger"}!
    </h1>
  );
};

export default GreetingMessage;
