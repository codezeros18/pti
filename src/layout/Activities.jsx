// Activities.jsx
import React, { useState } from "react";
import paper1 from "../assets/paper/1.png";
import icon from "../assets/icon/book1.png";
import moneyIcon from "../assets/icon/money1.png";
import { locationActivities } from "./locationActivities";
import { usePlayerStatus } from "../PlayerStatusContext";
import { useGame } from "../GameContext";
import GreetingMessage from "../components/GreetingMessage";

const INVENTORY_LIMIT = 3;

const Activities = ({ location = "home" }) => {
  const { eventMessage, updateStatus, money, addItem, inventory, removeItem, addScore, score } = usePlayerStatus();
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredAction, setHoveredAction] = useState(null);
  const actions = locationActivities[location] || [];

  // Helper to detect buy/store actions
  const isBuyAction = (action) =>
    action.name.toLowerCase().includes("buy") ||
    action.name.toLowerCase().includes("potion") ||
    action.name.toLowerCase().includes("snack") ||
    action.name.toLowerCase().includes("souvenir") ||
    action.name.toLowerCase().includes("charm");

  return (
    <div className="relative z-50">
      <div className="absolute top-18 right-0 m-4 z-20 text-white">
        <GreetingMessage />
      </div>
      <div className="absolute top-18 left-0 m-4 z-20 flex-col gap-4 items-center">
        <div className="flex gap-2 items-center text-yellow-600">
          <img src={moneyIcon} className="w-4 h-4" />
          <p>{money}</p>
        </div>
        <div className="flex gap-2 items-center text-yellow-600">
          <span>Score:</span>
          <span>{score}</span>
        </div>
      </div>
      <button onClick={() => setIsVisible(!isVisible)} className="absolute top-32 left-0 m-4 z-10 cursor-pointer">
        <img className="w-10 h-10 md:w-14 md:h-14 active:scale-95" src={icon} alt="Toggle Activities" />
      </button>

      {isVisible && (
        <div
          className="absolute top-32 left-0 w-[40vh] h-[40vh] md:w-[60vh] md:h-[60vh] bg-cover bg-no-repeat m-1 md:m-2"
          style={{ backgroundImage: `url(${paper1})` }}
        >
          <div className="flex flex-col justify-center mx-14 md:mx-24 my-14 md:my-20">
            <h4 className="text-[20px] md:text-[20px] text-[#255C4E]">You are at {location}</h4>

            {/* Inventory Section */}
            <div className="mt-0">
              <ul>
                {inventory.map((item, idx) => (
                  <li key={idx} className="flex gap-2 items-center my-2">
                    {item.icon && <img src={item.icon} className="w-4 h-4" alt={item.name} />}
                    <span>
                      {item.name.startsWith("Buy ") ? item.name.replace(/^Buy /, "") : item.name}
                    </span>
                    <button
                      className="ml-2 px-2 py-1 bg-[#255C4E] text-white rounded"
                      onClick={() => {
                        updateStatus({ ...item.effect, money: 0 });
                        removeItem(item.name);
                        addScore(5); // +5 for using an item
                      }}
                    >
                      Use
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {/* End Inventory Section */}

            {/* Actions Section */}
            <div className="mt-4">
              {actions.map((action, index) => {
                const cost = action.effect.money && action.effect.money < 0 ? -action.effect.money : 0;
                const canAfford = money >= cost;
                const buyAction = isBuyAction(action);
                const inventoryFull = inventory.length >= INVENTORY_LIMIT;

                return (
                  <div key={index} className="relative"
                    onMouseEnter={() => setHoveredAction(action.name)}
                    onMouseLeave={() => setHoveredAction(null)}
                  >
                  </div>
                );
              })}
            </div>
            {/* End Actions Section */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Activities;
