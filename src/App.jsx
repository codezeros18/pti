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


function App() {
  return (
    <GameProvider>
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
