import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DayeRunner from "./DayeRunner";

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GameModal({ isOpen, onClose }: GameModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(7, 13, 26, 0.88)", backdropFilter: "blur(6px)" }}
          onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
        >
          <motion.div
            initial={{ scale: 0.88, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.88, y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="relative w-full max-w-[840px] mx-4"
            style={{
              border: "1px solid #00c878",
              borderRadius: "16px",
              background: "#0f172a",
              boxShadow: "0 0 40px rgba(0,200,120,0.18), 0 0 80px rgba(0,200,120,0.08)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-3"
              style={{ borderBottom: "1px solid #1e293b" }}
            >
              <div className="flex items-center gap-3">
                {/* pixel dots */}
                <span style={{ display: "flex", gap: "5px" }}>
                  {["#ef4444", "#f59e0b", "#00c878"].map((c, i) => (
                    <span
                      key={i}
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 2,
                        background: c,
                        imageRendering: "pixelated",
                      }}
                    />
                  ))}
                </span>
                <span
                  className="corncorn"
                  style={{ color: "#00c878", fontSize: 16, letterSpacing: "0.08em" }}
                >
                  DAYE RUNNER
                </span>
                <span
                  style={{
                    fontSize: 10,
                    color: "#64748b",
                    fontFamily: "monospace",
                    paddingLeft: 8,
                  }}
                >
                  [ SPACE / ↑ / CLICK to jump ]  [ ESC to close ]
                </span>
              </div>
              <button
                onClick={onClose}
                aria-label="닫기"
                style={{
                  color: "#64748b",
                  fontSize: 18,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  lineHeight: 1,
                  transition: "color 0.2s",
                  padding: "2px 6px",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#ef4444")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#64748b")}
              >
                ✕
              </button>
            </div>

            {/* Game Canvas */}
            <div className="p-2">
              <DayeRunner isActive={isOpen} />
            </div>

            {/* Footer hint */}
            <div
              className="px-5 py-2 text-center"
              style={{
                borderTop: "1px solid #1e293b",
                color: "#334155",
                fontSize: 10,
                fontFamily: "monospace",
              }}
            >
              Dodge Bugs · Collect Tech Stacks · Survive Deadlines
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
