import { useState } from "react";
import { motion } from "framer-motion";
import GameButton from "./game/GameButton";
import GameModal from "./game/GameModal";

const TopButton = () => {
  const [isGameOpen, setIsGameOpen] = useState(false);

  return (
    <>
      {/* Stacked floating buttons: GameButton above TopButton */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
        <GameButton onClick={() => setIsGameOpen(true)} />
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
          className="w-14 h-14
                     bg-[#0f172a] border border-[var(--color-city-accent)]
                     text-[var(--color-city-accent)]
                     rounded-full shadow-lg
                     hover:bg-[var(--color-city-accent)] hover:text-[#0f172a]
                     hover:shadow-[0_0_20px_var(--color-city-accent)]
                     transition-all duration-300
                     flex items-center justify-center"
          aria-label="맨 위로 이동"
        >
          <span className="corncorn text-sm font-black tracking-wide">Top</span>
        </motion.button>
      </div>

      {/* Game Modal */}
      <GameModal isOpen={isGameOpen} onClose={() => setIsGameOpen(false)} />
    </>
  );
};

export default TopButton;
