import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<"counting" | "reveal" | "done">("counting");

  useEffect(() => {
    let current = 0;
    const steps = [
      { target: 33, delay: 60 },
      { target: 67, delay: 40 },
      { target: 100, delay: 25 },
    ];

    let stepIdx = 0;
    const run = () => {
      if (stepIdx >= steps.length) {
        setPhase("reveal");
        setTimeout(onComplete, 900);
        return;
      }
      const { target, delay } = steps[stepIdx];
      const tick = () => {
        current++;
        setCount(current);
        if (current < target) {
          setTimeout(tick, delay + Math.random() * 20);
        } else {
          stepIdx++;
          setTimeout(run, 120);
        }
      };
      tick();
    };

    const startTimeout = setTimeout(run, 300);
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
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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

          {/* Glow orb */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-96 h-96 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(202,163,83,0.12) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-10">
            {/* Logo mark — eagle with grow animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-3"
            >
              <motion.div
                animate={{
                  scale: [1, 1.06, 1],
                  filter: [
                    "drop-shadow(0 0 12px rgba(202,163,83,0.3))",
                    "drop-shadow(0 0 32px rgba(202,163,83,0.7))",
                    "drop-shadow(0 0 12px rgba(202,163,83,0.3))",
                  ],
                }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <img
                  src="/logo.svg"
                  alt="Core Elite Digital"
                  style={{ width: 160, height: 160, objectFit: "contain" }}
                />
              </motion.div>
            </motion.div>

            {/* Counter */}
            <div className="relative">
              <motion.span
                key={count}
                className="text-[5rem] font-black tabular-nums leading-none"
                style={{
                  background: "linear-gradient(135deg, #CAA353 0%, #F0C97A 50%, #CAA353 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  textShadow: "none",
                }}
              >
                {String(count).padStart(2, "0")}
              </motion.span>
              <span className="absolute -bottom-1 right-0 text-sm font-bold text-white/20">%</span>
            </div>

            {/* Progress bar */}
            <div className="w-64 h-[1px] bg-white/10 relative overflow-hidden rounded-full">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                animate={{ width: `${count}%` }}
                transition={{ duration: 0.1 }}
                style={{ background: "linear-gradient(to right, #8B6914, #CAA353, #F0C97A)" }}
              />
            </div>

            {/* Status text */}
            <motion.p
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="text-[10px] tracking-[0.4em] uppercase text-white/25 font-medium"
            >
              {count < 40 ? "Initializing Systems" : count < 80 ? "Loading Assets" : "Ready"}
            </motion.p>
          </div>

          {/* Curtain reveal */}
          <AnimatePresence>
            {phase === "reveal" && (
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                exit={{}}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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
