import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function EagleSVG({ flying, facingLeft }: { flying: boolean; facingLeft: boolean }) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      style={{ transform: facingLeft ? "scaleX(-1)" : "scaleX(1)", filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.6))" }}
    >
      {flying ? (
        <>
          {/* Left wing */}
          <motion.path
            d="M24 24 C16 18 6 12 2 17 C8 19 16 21 24 26"
            fill="#7B4A2D"
            animate={{ d: ["M24 24 C16 18 6 12 2 17 C8 19 16 21 24 26", "M24 24 C16 28 6 30 2 27 C8 26 16 25 24 26", "M24 24 C16 18 6 12 2 17 C8 19 16 21 24 26"] }}
            transition={{ duration: 0.45, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Right wing */}
          <motion.path
            d="M24 24 C32 18 42 12 46 17 C40 19 32 21 24 26"
            fill="#7B4A2D"
            animate={{ d: ["M24 24 C32 18 42 12 46 17 C40 19 32 21 24 26", "M24 24 C32 28 42 30 46 27 C40 26 32 25 24 26", "M24 24 C32 18 42 12 46 17 C40 19 32 21 24 26"] }}
            transition={{ duration: 0.45, repeat: Infinity, ease: "easeInOut", delay: 0 }}
          />
          {/* Body */}
          <ellipse cx="24" cy="28" rx="7" ry="5" fill="#3D2010" />
          {/* White head */}
          <circle cx="32" cy="21" r="5.5" fill="#F5F0E8" />
          {/* Beak */}
          <path d="M37 20.5 L42 20 L37 22 Z" fill="#DAA520" />
          {/* Eye */}
          <circle cx="34.5" cy="20" r="1.8" fill="#1a0a00" />
          <circle cx="35" cy="19.5" r="0.6" fill="white" />
          {/* Tail */}
          <path d="M17 30 C14 34 16 37 19 36 C18 33 18 31 19 29" fill="#3D2010" />
        </>
      ) : (
        <>
          {/* Wings folded */}
          <path d="M16 26 C12 26 10 32 13 35 C14 32 15 28 18 26" fill="#5C3418" />
          <path d="M32 26 C36 26 38 32 35 35 C34 32 33 28 30 26" fill="#5C3418" />
          {/* Body */}
          <ellipse cx="24" cy="30" rx="8" ry="9" fill="#3D2010" />
          {/* Wing tips */}
          <path d="M16 27 C13 28 12 31 14 33" stroke="#7B4A2D" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M32 27 C35 28 36 31 34 33" stroke="#7B4A2D" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          {/* Chest lighter */}
          <ellipse cx="24" cy="32" rx="4.5" ry="5" fill="#5C3418" opacity="0.6" />
          {/* White head */}
          <circle cx="24" cy="18" r="6.5" fill="#F5F0E8" />
          {/* Beak */}
          <path d="M29.5 18 L34 17.5 L29.5 19.5 Z" fill="#DAA520" />
          {/* Eye */}
          <circle cx="27" cy="17" r="2" fill="#1a0a00" />
          <circle cx="27.5" cy="16.5" r="0.7" fill="white" />
          {/* Fierce brow */}
          <path d="M25 14.5 C26 13.5 28 13.5 29.5 14.5" stroke="#7B4A2D" strokeWidth="1.2" strokeLinecap="round" fill="none" />
          {/* Talons */}
          <path d="M20 39 L18 44 M20 39 L20 44 M20 39 L22 43" stroke="#DAA520" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M28 39 L26 44 M28 39 L28 44 M28 39 L30 43" stroke="#DAA520" strokeWidth="1.5" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

export function EagleMascot() {
  const controls = useAnimation();
  const [isFlying, setIsFlying] = useState(false);
  const [facingLeft, setFacingLeft] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const currentPos = useRef({ x: window.innerWidth - 110, y: 80 });
  const [renderPos, setRenderPos] = useState({ x: window.innerWidth - 110, y: 80 });
  const bubbleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Idle bobbing
  useEffect(() => {
    controls.start({
      y: [0, -6, 0],
      transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
    });
  }, [controls]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isContact =
        target.closest("#contact") !== null ||
        target.closest("[data-testid*='contact']") !== null ||
        target.closest("[data-testid*='book']") !== null ||
        target.closest("input") !== null ||
        target.closest("textarea") !== null ||
        target.closest("button") !== null ||
        target.closest("a") !== null;

      const destX = e.clientX - 24;
      const destY = e.clientY - 52;

      const dx = destX - currentPos.current.x;
      const dy = destY - currentPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 10) return;

      setFacingLeft(dx < 0);
      setIsFlying(true);
      if (bubbleTimer.current) clearTimeout(bubbleTimer.current);
      setShowBubble(false);

      const arcLift = -Math.min(dist * 0.25, 120);
      const midX = (currentPos.current.x + destX) / 2;
      const midY = (currentPos.current.y + destY) / 2 + arcLift;

      controls
        .start({
          x: [currentPos.current.x, midX, destX],
          y: [currentPos.current.y, midY, destY],
          rotate: [0, dx > 0 ? 12 : -12, 0],
          transition: {
            duration: Math.min(0.55 + dist / 2000, 1.1),
            ease: [0.16, 1, 0.3, 1],
            times: [0, 0.5, 1],
          },
        })
        .then(() => {
          currentPos.current = { x: destX, y: destY };
          setRenderPos({ x: destX, y: destY });
          setIsFlying(false);
          // Landing bounce
          controls.start({
            y: [destY, destY - 8, destY + 2, destY],
            transition: { duration: 0.4, ease: "easeOut" },
          }).then(() => {
            // Restart idle bob
            controls.start({
              y: [destY, destY - 6, destY],
              transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
            });
            // Show bubble for contact-related clicks
            if (isContact) {
              setShowBubble(true);
              bubbleTimer.current = setTimeout(() => setShowBubble(false), 3000);
            }
          });
        });
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
      if (bubbleTimer.current) clearTimeout(bubbleTimer.current);
    };
  }, [controls]);

  return (
    <motion.div
      className="fixed z-[9998] pointer-events-none select-none"
      style={{ left: 0, top: 0, x: renderPos.x, y: renderPos.y }}
      animate={controls}
    >
      {/* Speech bubble */}
      {showBubble && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wide shadow-xl"
          style={{
            background: "linear-gradient(135deg, #CAA353, #F0C97A)",
            color: "#0c0c0e",
            boxShadow: "0 4px 16px rgba(202,163,83,0.4)",
          }}
        >
          Let's connect! 🎯
          <div
            className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
            style={{ borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "5px solid #CAA353" }}
          />
        </motion.div>
      )}

      <EagleSVG flying={isFlying} facingLeft={facingLeft} />
    </motion.div>
  );
}
