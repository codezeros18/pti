import React, { useEffect, useRef, useState } from "react";

const ActivityModal = ({
  activity,
  onComplete,
  fastForward,
  setFastForward,
}) => {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const completedRef = useRef(false);

  // Reset progress only when activity changes
  useEffect(() => {
    setProgress(0);
    completedRef.current = false;
  }, [activity]);

  useEffect(() => {
    if (!activity) return;
    if (intervalRef.current) clearInterval(intervalRef.current);

    const duration = fastForward ? 2 : activity.duration || 10;
    const updatesPerSecond = 20;
    const increment = 100 / (duration * updatesPerSecond);

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(intervalRef.current);
          if (!completedRef.current) {
            completedRef.current = true;
            onComplete();
          }
          return 100;
        }
        return next;
      });
    }, 1000 / updatesPerSecond);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [activity, fastForward, onComplete]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 bg-cover z-50">
      <img src={activity.animation} alt={activity.name} className="w-full h-full md:w-96 md:h-96 mb-4" />
      <div className="w-64 h-4 bg-gray-300 rounded mb-4 overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setFastForward(false)}
          className={`px-4 py-2 cursor-pointer rounded shadow ${!fastForward ? "bg-[#3e5c3c] text-[#f8f8f2]" : "bg-[#4c372a] text-[#f8f8f2]"}`}
          disabled={!fastForward || progress >= 100}
        >
          Normal
        </button>
        <button
          onClick={() => setFastForward(true)}
          className={`px-4 py-2 cursor-pointer rounded shadow ${fastForward ? "bg-[#b88c3b] text-[#1f140b]" : "bg-[#d1a04c] text-[#1f140b]"}`}
          disabled={fastForward || progress >= 100}
        >
          Fast Forward
        </button>
      </div>
    </div>
  );
};

export default ActivityModal;