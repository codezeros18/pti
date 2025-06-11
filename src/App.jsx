import './App.css'
import { HashRouter as Router, Route, Routes } from "react-router-dom"; 
import Character from './pages/Character';
import Home from './pages/Home';
import House from './pages/House';
import Beach from './pages/Beach';
import Lake from './pages/Lake';
import Temple from './pages/Temple';
import Mountain from './pages/Mountain';
import Dungeon from './pages/Dungeon';
import { GameProvider } from "./GameContext";
import bgm from './assets/song/music.mp3';
import React, { useRef, useEffect, useState } from 'react';
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";

function App() {
  const audioRef = useRef(null);
  const [musicMuted, setMusicMuted] = useState(() => {
    const saved = localStorage.getItem('musicMuted');
    return saved === null ? true : JSON.parse(saved);
  });

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.muted = musicMuted;
      if (!musicMuted) {
        // Try to play if not muted
        audioRef.current.play().catch(() => {});
      }
    }
  }, [musicMuted]);

  useEffect(() => {
    localStorage.setItem('musicMuted', JSON.stringify(musicMuted));
  }, [musicMuted]);

  const handleToggleMusic = () => {
    setMusicMuted((prev) => !prev);
  };

  return (
    <GameProvider>
      {/* Global audio player */}
      <audio ref={audioRef} src={bgm} loop autoPlay />
      <button
        onClick={handleToggleMusic}
        className='flex items-center gap-2 fixed top-4 right-4 bg-transparent md:bg-[#255C4E] text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-700 transition-colors duration-300 z-50'
      >
        {musicMuted ? (
          <HiSpeakerXMark className="w-6 h-6" />
        ) : (
          <HiSpeakerWave className="w-6 h-6" />
        )}
      </button>
      <Router>
        <Routes>
          <Route path="/" element={<Character />} />
          <Route path="/home" element={<Home />} />
          <Route path="/beach" element={<Beach />} />
          <Route path="/lake" element={<Lake />} />
          <Route path="/temple" element={<Temple />} />
          <Route path="/mountain" element={<Mountain />} />
          <Route path="/dungeon" element={<Dungeon />} />
          <Route path="/house" element={<House />} />
        </Routes>
      </Router>
    </GameProvider>
  );
}

export default App;
