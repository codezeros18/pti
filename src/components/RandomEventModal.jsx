import React from "react";

const RandomEventModal = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[100]">
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-6 py-4 rounded-xl shadow-lg text-center max-w-xs w-full animate-fade-in-up">
        <p className="text-lg font-semibold">Random Event</p>
        <p className="mt-2">{message}</p>
      </div>
    </div>
  );
};

export default RandomEventModal;
