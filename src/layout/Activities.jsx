// Activities.jsx
import React, { useState } from "react";
import paper1 from "../assets/paper/1.png";
import icon from "../assets/icon/book1.png";
import moneyIcon from "../assets/icon/money1.png";
import { locationActivities } from "./locationActivities";
import { usePlayerStatus } from "../PlayerStatusContext";
import { useGame } from "../GameContext";
import GreetingMessage from "../components/GreetingMessage";
import char1 from '../assets/char/char1.png';
import char2 from '../assets/char/char3.png';
import char3 from '../assets/char/char4.png';
import char4 from '../assets/char/char5.png';

const charImages = [char1, char2, char3, char4];

const Activities = ({ location = "home" }) => {
  const { playerName } = useGame();
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredAction, setHoveredAction] = useState(null);
  const { money, updateStatus } = usePlayerStatus();
  const actions = locationActivities[location] || [];

  return (
    <div className="relative z-50">
      <div className="absolute top-18 right-0 m-4 z-20 text-white">
        <GreetingMessage />
      </div>

      <div className="absolute top-18 left-0 m-4 z-20 flex gap-2 items-center text-yellow-600">
        <img src={moneyIcon} className="w-4 h-4" />
        <p>{money}</p>
      </div>
      <button onClick={() => setIsVisible(!isVisible)} className="absolute top-28 left-0 m-4 z-10 cursor-pointer">
        <img className="w-10 h-10 md:w-14 md:h-14 active:scale-95" src={icon} alt="Toggle Activities" />
      </button>

      {isVisible && (
        <div
          className="absolute top-28 left-0 w-[40vh] h-[40vh] md:w-[60vh] md:h-[60vh] bg-cover bg-no-repeat m-1 md:m-2"
          style={{ backgroundImage: `url(${paper1})` }}
        >
          <div className="flex flex-col justify-center mx-14 md:mx-24 my-14 md:my-20">
            <h4 className="text-[20px] md:text-2xl text-[#255C4E]">You are at {location}</h4>
            {actions.map((action, index) => {
            const cost = action.effect.money && action.effect.money < 0 ? -action.effect.money : 0;
            const canAfford = money >= cost;

            return (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => setHoveredAction(action.name)}
                onMouseLeave={() => setHoveredAction(null)}
              >
                <button
                  className={`flex justify-center items-center gap-2 px-6 text-[12px] md:text-[14px] py-1 md:py-2 my-1 md:my-2 cursor-pointer rounded-lg w-full border active:scale-95
                    ${canAfford
                      ? "bg-[#255C4E] text-white hover:bg-[#1B3C34] border-[#61A6C0] hover:border-[#6EC6FF]"
                      : "bg-gray-300 text-gray-600 border-gray-400 cursor-not-allowed"
                    }`}
                  onClick={() => canAfford && updateStatus(action.effect)}
                  disabled={!canAfford}
                >
                  {action.icon && <img src={action.icon} className="w-4 h-4" />}
                  {action.name}
                </button>

                {hoveredAction === action.name && (
                  <div className="absolute left-full ml-4 w-36 p-2 bg-[#FFF4A3] text-[#255C4E] text-xs rounded shadow-lg">
                    {action.benefit}
                    {!canAfford && <p className="mt-1 text-red-500">Not enough money</p>}
                  </div>
                )}
              </div>
            );
          })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Activities;
