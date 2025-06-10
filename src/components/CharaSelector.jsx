import React from "react";
import { useGame } from "../GameContext";
import { usePlayerStatus } from "../PlayerStatusContext"; // ✅ Import to sync context
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import char1 from "../assets/Char1/Idle.png";
import char2 from "../assets/Char2/Idle.png";
import char3 from "../assets/Char3/Idle.png";

const characters = [
  { img: char1, description: "An agile adventurer with speed boost." },
  { img: char2, description: "A magician with elemental powers." },
  { img: char3, description: "A warrior with high strength." },
];

const CharaSelector = () => {
  const {
    playerName,
    setPlayerName,
    selectedCharacter,
    setSelectedCharacter,
  } = useGame();

  const { updateStatus } = usePlayerStatus(); // ✅ Import updateStatus from PlayerStatusContext
  const navigate = useNavigate();

  const handleStartGame = () => {
    // ✅ Sync name and character to PlayerStatusContext
    updateStatus({
      playerName,
      selectedChar: selectedCharacter,
    });

    navigate("/home");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-white font-mono">
      <h2 className="text-2xl md:text-3xl mb-6 text-[#5A3825] drop-shadow-lg font-bold">
        Select Your Character
      </h2>

      <div className="relative w-[70vw] max-w-[600px] mb-6">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          pagination={{ clickable: true, el: ".custom-pagination" }}
          navigation={{
            nextEl: ".next-btn",
            prevEl: ".prev-btn",
          }}
          onSlideChange={(swiper) => setSelectedCharacter(swiper.realIndex)}
          className="w-full h-auto"
        >
          {characters.map((char, index) => (
            <SwiperSlide key={index}>
              <img
                src={char.img}
                alt={`Character ${index}`}
                className="mx-auto max-w-[100px] md:max-w-[140px] h-auto drop-shadow-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <button className="prev-btn absolute left-[-50px] top-1/2 transform -translate-y-1/2 
          bg-[#f4e3a0] border-2 border-[#a67843] px-3 py-2 rounded shadow-lg 
          hover:bg-[#f49e4c] transition duration-200">
          <span className="text-[#5a3e2b] font-bold text-xl">❮</span>
        </button>
        <button className="next-btn absolute right-[-50px] top-1/2 transform -translate-y-1/2 
          bg-[#f4e3a0] border-2 border-[#a67843] px-3 py-2 rounded shadow-lg 
          hover:bg-[#f49e4c] transition duration-200">
          <span className="text-[#5a3e2b] font-bold text-xl">❯</span>
        </button>
        <div className="custom-pagination flex justify-center gap-2 mt-4" />
      </div>

      <div className="text-center max-w-[400px] px-4 mb-2 md:mb-4">
        <p className="text-sm text-[#6D4C41]">
          {characters[selectedCharacter].description}
        </p>
      </div>

      <input
        type="text"
        placeholder="Enter your name..."
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        className="px-4 py-2 rounded-lg text-center text-black focus:outline-none mb-2 md:mb-6 w-[250px]"
      />

      <button
        onClick={handleStartGame}
        className="px-6 py-3 bg-[#255C4E] hover:bg-[#1B3C34] cursor-pointer text-white rounded-xl text-sm md:text-lg tracking-wide font-semibold shadow-lg transition-all duration-200 ease-in-out active:scale-95"
        disabled={!playerName.trim()}
      >
        Start Game
      </button>
    </div>
  );
};

export default CharaSelector;
