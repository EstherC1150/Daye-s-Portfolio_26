import { motion } from "framer-motion";

interface GameButtonProps {
  onClick: () => void;
}

// Pixel art arcade joystick controller — 20×16 grid, cell = 2px → 40×32px
// Colors: white body, accent green, red, yellow, blue buttons
function PixelController() {
  const s = 2;

  // 0=transparent, 1=white, 2=green(#00c878), 3=red(#ef4444), 4=blue(#60a5fa), 5=yellow(#fbbf24), 6=gray(#475569)
  const grid: number[][] = [
    // col: 0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19
           [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0], // 0
           [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], // 1
           [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 2
           [1, 1, 1, 6, 1, 1, 1, 1, 6, 6, 6, 6, 1, 1, 1, 3, 1, 1, 1, 1], // 3 ← dpad top, btns
           [1, 1, 1, 6, 6, 1, 1, 1, 6, 1, 1, 6, 1, 2, 1, 3, 3, 1, 1, 1], // 4
           [1, 1, 6, 6, 6, 6, 6, 1, 6, 6, 6, 6, 1, 2, 2, 1, 3, 1, 1, 1], // 5 ← dpad h-bar
           [1, 1, 1, 6, 6, 1, 1, 1, 6, 1, 1, 6, 1, 1, 2, 1, 1, 1, 1, 1], // 6
           [1, 1, 1, 6, 1, 1, 1, 1, 6, 6, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1], // 7 ← dpad bottom
           [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 8
           [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 9
           // speaker dots + start/select
           [1, 1, 6, 1, 6, 1, 1, 5, 1, 5, 1, 4, 1, 4, 1, 6, 1, 6, 1, 1], // 10
           [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 11
           [1, 1, 6, 1, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 1, 6, 1, 6, 1], // 12
           [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 13
           [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0], // 14 ← handle ears
           [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0], // 15
  ];

  const colorMap: Record<number, string> = {
    1: "#e2e8f0",   // light white-gray body
    2: "#00c878",   // green (accent)
    3: "#ef4444",   // red
    4: "#60a5fa",   // blue
    5: "#fbbf24",   // yellow
    6: "#334155",   // dark gray (dpad, speakers)
  };

  const W = 20 * s;
  const H = 16 * s;

  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
    >
      {grid.map((row, r) =>
        row.map((cell, c) =>
          cell !== 0 ? (
            <rect
              key={`${r}-${c}`}
              x={c * s}
              y={r * s}
              width={s}
              height={s}
              fill={colorMap[cell]}
            />
          ) : null
        )
      )}
    </svg>
  );
}

export default function GameButton({ onClick }: GameButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      whileHover={{ scale: 1.25, rotate: -8, y: -3 }}
      whileTap={{ scale: 0.88 }}
      onClick={onClick}
      aria-label="미니게임 열기"
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "6px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        filter: "drop-shadow(0 0 6px rgba(0,200,120,0.5))",
      }}
    >
      <PixelController />
    </motion.button>
  );
}
