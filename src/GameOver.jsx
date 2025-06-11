import { useNavigate } from 'react-router-dom';
import { usePlayerStatus } from './PlayerStatusContext';

const GameOver = () => {
  const navigate = useNavigate();
  const { gameOver, resetGame, score } = usePlayerStatus(); // <-- get score

  if (!gameOver) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-white bg-opacity-80 flex items-center justify-center font-retro pointer-events-auto">
      {/* Lock out all other interactions */}
    <div className="absolute inset-0 z-0 pointer-events-auto" />

      {/* Modal content */}
    <div className="relative z-10 bg-[#222831] text-[#FFD369] border-4 border-[#FF2E63] rounded-sm p-6 max-w-sm w-full text-center shadow-[0_0_0_4px_#393E46]">
      <h2 className="text-xl md:text-2xl mb-4">GAME OVER</h2>
      <p className="text-sm md:text-base mb-6 px-2 leading-relaxed">
        One of your vital stats dropped to 0.<br />Your journey ends here.
      </p>
      <p className="text-lg font-bold mb-4">
        Life Satisfaction Score: <span className="text-2xl">{score}</span>
      </p>
      <button
        onClick={() => {
          resetGame();
          navigate('/');
        }}
        className="bg-[#FF2E63] text-white px-5 py-2 border-2 border-white hover:bg-[#e61a4f] active:translate-y-[2px] transition-all duration-150"
      >
        Restart Game
      </button>
    </div>
  </div>

  );
};

export default GameOver;
