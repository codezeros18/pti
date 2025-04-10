import './App.css'
import { HashRouter as Router, Route, Routes } from "react-router-dom"; 
import Character from './pages/Character';
import Home from './pages/Home';
import { GameProvider } from "./GameContext"; // ✅

function App() {
  return (
    <GameProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Character />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </GameProvider>
  );
}

export default App;
