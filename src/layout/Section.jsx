import React from "react";
import { usePlayerStatus } from "../PlayerStatusContext"; 
import Icon1 from "../assets/icon/hungry.png";
import Icon2 from "../assets/icon/sleep.png";
import Icon3 from "../assets/icon/happy.png";
import Icon4 from "../assets/icon/bath.png";

const Section = () => {
  const { hunger, energy, happiness, hygiene, day, time } = usePlayerStatus();

  const statusList = [
    { icon: Icon1, value: hunger },
    { icon: Icon2, value: energy },
    { icon: Icon3, value: happiness },
    { icon: Icon4, value: hygiene },
  ];

  return (
    <div className="absolute bottom-0 w-full py-2 font-jersey bg-black/50 text-white z-50">
      <div className="flex flex-col items-center pl-2 md:pl-0">
        <p>Day {day}, {time}:00</p>
        <div className="flex flex-wrap gap-4 mt-2">
          {statusList.map((stat, index) => (
            <div key={index} className="flex items-center gap-2">
              <img src={stat.icon} className="w-6 h-6" />
              <div className="w-32 bg-gray-300 rounded-full overflow-hidden">
                <div
                  className="h-3 bg-green-500 transition-all duration-500"
                  style={{ width: `${stat.value}%` }}
                ></div>
              </div>
              <span className="text-xs">{Math.round(stat.value)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section;
