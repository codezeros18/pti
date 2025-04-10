import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PlayerStatusProvider } from "./PlayerStatusContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PlayerStatusProvider>
      <App />
    </PlayerStatusProvider>
  </StrictMode>
)
