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
import { GameProvider } from "./GameContext"; // ✅
import bgm from './assets/song/music.mp3'; // adjust path if needed
import React, { useRef, useEffect } from 'react';


function App() {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }
  }, []);

  return (
    <GameProvider>
      {/* Infinite background music */}
      <audio ref={audioRef} src={bgm} autoPlay loop />
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
