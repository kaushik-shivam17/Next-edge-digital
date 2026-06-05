import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<"counting" | "reveal" | "done">("counting");

  useEffect(() => {
    let current = 0;
    // Faster steps: total ~1.2s instead of ~3.5s
    const steps = [
      { target: 40, delay: 18 },
      { target: 75, delay: 12 },
      { target: 100, delay: 8 },
    ];

    let stepIdx = 0;
    const run = () => {
      if (stepIdx >= steps.length) {
        setPhase("reveal");
        setTimeout(onComplete, 500);
        return;
      }
      const { target, delay } = steps[stepIdx];
      const tick = () => {
        current++;
        setCount(current);
        if (current < target) {
          setTimeout(tick, delay + Math.random() * 8);
        } else {
          stepIdx++;
          setTimeout(run, 60);
        }
      };
      tick();
    };

    // Start immediately, no 300ms pause
    const startTimeout = setTimeout(run, 50);
    return () => clearTimeout(startTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
          style={{ background: "#09090b" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(202,163,83,1) 1px, transparent 1px), linear-gradient(to bottom, rgba(202,163,83,1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Glow orb — static, no pulse animation for perf */}
          <div
            className="absolute w-80 h-80 rounded-full pointer-events-none opacity-40"
            style={{
              background: "radial-gradient(circle, rgba(202,163,83,0.12) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src="/logo.svg"
                alt="Core Elite Digital"
                style={{ width: 120, height: 120, objectFit: "contain", filter: "drop-shadow(0 0 16px rgba(202,163,83,0.5))" }}
              />
            </motion.div>

            {/* Counter */}
            <div className="relative">
              <span
                className="text-[4.5rem] font-black tabular-nums leading-none"
                style={{
                  background: "linear-gradient(135deg, #CAA353 0%, #F0C97A 50%, #CAA353 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {String(count).padStart(2, "0")}
              </span>
              <span className="absolute -bottom-1 right-0 text-sm font-bold text-white/20">%</span>
            </div>

            {/* Progress bar */}
            <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden rounded-full">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                animate={{ width: `${count}%` }}
                transition={{ duration: 0.08 }}
                style={{ background: "linear-gradient(to right, #8B6914, #CAA353, #F0C97A)" }}
              />
            </div>
          </div>

          {/* Curtain reveal */}
          <AnimatePresence>
            {phase === "reveal" && (
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                exit={{}}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
                style={{ background: "#09090b", transformOrigin: "top" }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
