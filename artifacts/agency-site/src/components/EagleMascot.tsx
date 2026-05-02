import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";

// ─── Eagle cry via Web Audio API ───────────────────────────────────────────────
function playEagleCry() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();

    // Layer 1 — descending screech
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.connect(gain1); gain1.connect(ctx.destination);
    osc1.type = "sawtooth";
    osc1.frequency.setValueAtTime(1100, ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(420, ctx.currentTime + 0.35);
    osc1.frequency.setValueAtTime(620, ctx.currentTime + 0.38);
    osc1.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 0.7);
    gain1.gain.setValueAtTime(0, ctx.currentTime);
    gain1.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.04);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.75);
    osc1.start(ctx.currentTime); osc1.stop(ctx.currentTime + 0.75);

    // Layer 2 — harmonic texture
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.connect(gain2); gain2.connect(ctx.destination);
    osc2.type = "square";
    osc2.frequency.setValueAtTime(550, ctx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(210, ctx.currentTime + 0.5);
    gain2.gain.setValueAtTime(0, ctx.currentTime);
    gain2.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.05);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    osc2.start(ctx.currentTime); osc2.stop(ctx.currentTime + 0.6);
  } catch (_) { /* audio not available */ }
}

// ─── SVG Eagle ─────────────────────────────────────────────────────────────────
// Three states: "perched" | "hovering" | "flying"
// Design: black silhouette entity, golden eye + beak for contrast

const W_LEVEL_L = "M28 27 C20 23 10 17 3 19 C9 21 18 24 28 29";
const W_UP_L    = "M28 27 C20 17 10 10 3 12 C9 15 18 20 28 29";
const W_DOWN_L  = "M28 27 C20 30 10 29 3 27 C9 26 18 27 28 29";

const W_LEVEL_R = "M28 27 C36 23 46 17 53 19 C47 21 38 24 28 29";
const W_UP_R    = "M28 27 C36 17 46 10 53 12 C47 15 38 20 28 29";
const W_DOWN_R  = "M28 27 C36 30 46 29 53 27 C47 26 38 27 28 29";

function EagleSVG({
  state,
  facingLeft,
  wingPhase,
}: {
  state: "perched" | "hovering" | "flying";
  facingLeft: boolean;
  wingPhase: number; // 0-1 for smooth manual control when needed
}) {
  const flip = facingLeft ? { transform: "scaleX(-1)", transformOrigin: "center" } : {};
  const shadow = "drop-shadow(0 4px 14px rgba(0,0,0,0.95)) drop-shadow(0 1px 3px rgba(0,0,0,1))";

  if (state === "perched") {
    return (
      <svg width="54" height="58" viewBox="0 0 54 58" fill="none" style={{ ...flip, filter: shadow }}>
        {/* Tail feathers */}
        <path d="M20 43 C17 50 21 55 27 53 C33 55 37 50 34 43" fill="#0a0a0a" />
        {/* Body */}
        <ellipse cx="27" cy="32" rx="9" ry="12" fill="#111" />
        {/* Wing left folded */}
        <path d="M18 26 C13 28 12 36 15 40 C16 35 17 30 19 27" fill="#0d0d0d" />
        {/* Wing right folded */}
        <path d="M36 26 C41 28 42 36 39 40 C38 35 37 30 35 27" fill="#0d0d0d" />
        {/* Neck */}
        <ellipse cx="27" cy="19" rx="5.5" ry="6" fill="#111" />
        {/* Head */}
        <circle cx="27" cy="12" r="7.5" fill="#141414" />
        {/* Fierce brow */}
        <path d="M24 8 C26 6.5 30 6.5 32.5 8" stroke="#000" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Beak */}
        <path d="M33.5 11.5 L41 11 L33.5 13.5 Z" fill="#DAA520" />
        {/* Eye — gold iris, black pupil */}
        <circle cx="31" cy="10.5" r="2.8" fill="#DAA520" />
        <circle cx="31.5" cy="10.5" r="1.2" fill="#050505" />
        <circle cx="32" cy="10" r="0.4" fill="rgba(255,255,255,0.5)" />
        {/* Legs */}
        <line x1="23" y1="43" x2="21" y2="51" stroke="#333" strokeWidth="2" strokeLinecap="round" />
        <line x1="31" y1="43" x2="33" y2="51" stroke="#333" strokeWidth="2" strokeLinecap="round" />
        {/* Talons left */}
        <path d="M21 51 L18 55 M21 51 L21 56 M21 51 L24 55" stroke="#444" strokeWidth="1.5" strokeLinecap="round" />
        {/* Talons right */}
        <path d="M33 51 L30 55 M33 51 L33 56 M33 51 L36 55" stroke="#444" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  // hovering + flying share the spread-wing layout
  const slowHover = state === "hovering";

  return (
    <svg width="58" height="46" viewBox="0 0 58 46" fill="none" style={{ ...flip, filter: shadow }}>
      {/* Left wing — animated */}
      <motion.path
        key={`lw-${state}`}
        initial={{ d: W_LEVEL_L }}
        fill="#0d0d0d"
        animate={
          slowHover
            ? { d: [W_LEVEL_L, W_UP_L, W_LEVEL_L, W_DOWN_L, W_LEVEL_L] }
            : { d: [W_UP_L, W_DOWN_L, W_UP_L] }
        }
        transition={
          slowHover
            ? { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.42, repeat: Infinity, ease: "easeInOut" }
        }
      />
      {/* Right wing — animated */}
      <motion.path
        key={`rw-${state}`}
        initial={{ d: W_LEVEL_R }}
        fill="#0d0d0d"
        animate={
          slowHover
            ? { d: [W_LEVEL_R, W_UP_R, W_LEVEL_R, W_DOWN_R, W_LEVEL_R] }
            : { d: [W_UP_R, W_DOWN_R, W_UP_R] }
        }
        transition={
          slowHover
            ? { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.42, repeat: Infinity, ease: "easeInOut" }
        }
      />
      {/* Wing sheen lines */}
      <path d="M28 28 C22 25 14 22 8 23" stroke="#1a1a1a" strokeWidth="1" opacity="0.5" />
      <path d="M28 28 C34 25 42 22 48 23" stroke="#1a1a1a" strokeWidth="1" opacity="0.5" />
      {/* Body */}
      <ellipse cx="28" cy="29" rx="7.5" ry="5" fill="#111" />
      {/* Tail */}
      <path d="M21 31 C18 36 20 40 25 39" fill="#0a0a0a" />
      <path d="M35 31 C38 36 36 40 31 39" fill="#0a0a0a" />
      {/* Head */}
      <circle cx="37" cy="23" r="6.5" fill="#141414" />
      {/* Beak */}
      <path d="M43 22 L50 21.5 L43 23.8 Z" fill="#DAA520" />
      {/* Eye */}
      <circle cx="40" cy="21" r="2.5" fill="#DAA520" />
      <circle cx="40.3" cy="21" r="1.1" fill="#050505" />
      <circle cx="40.7" cy="20.6" r="0.4" fill="rgba(255,255,255,0.5)" />
      {/* Brow fierce */}
      <path d="M37 18.5 C38.5 17 41 17 43 18" stroke="#000" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

// ─── Main Mascot ───────────────────────────────────────────────────────────────
export function EagleMascot() {
  const controls = useAnimation();
  const [eagleState, setEagleState] = useState<"perched" | "hovering" | "flying">("hovering");
  const [facingLeft, setFacingLeft] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [wingPhase, setWingPhase] = useState(0);

  const posRef = useRef({ x: window.innerWidth - 120, y: 60 });
  const [cssPos, setCssPos] = useState({ x: window.innerWidth - 120, y: 60 });
  const isAnimating = useRef(false);
  const bubbleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Viewport-aware clamp
  const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

  // Start hovering idle after 1.5s of no clicks
  const startIdle = useCallback(() => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      if (!isAnimating.current) setEagleState("hovering");
    }, 1500);
  }, []);

  // Initial hover
  useEffect(() => {
    setEagleState("hovering");
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (isAnimating.current) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Clamp destination so eagle stays in viewport
      const rawX = e.clientX - 28;
      const rawY = e.clientY - 52;
      const destX = clamp(rawX, 10, vw - 70);
      const destY = clamp(rawY, 10, vh - 65);

      const dx = destX - posRef.current.x;
      const dy = destY - posRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 14) return;

      // Determine facing
      setFacingLeft(dx < 0);

      // Takeoff
      isAnimating.current = true;
      setEagleState("flying");
      playEagleCry();
      if (bubbleTimer.current) clearTimeout(bubbleTimer.current);
      setShowBubble(false);

      // Arc: midpoint lifted by arc height
      const arcLift = clamp(dist * 0.3, 40, 160);
      const midX = (posRef.current.x + destX) / 2;
      const midY = Math.min(posRef.current.y, destY) - arcLift;

      const duration = clamp(0.5 + dist / 2200, 0.5, 1.2);
      const bankAngle = clamp(dx * 0.06, -25, 25);

      controls
        .start({
          x: [posRef.current.x, midX, destX],
          y: [posRef.current.y, midY, destY],
          rotate: [0, bankAngle, 0],
          transition: {
            duration,
            ease: [0.25, 0.8, 0.25, 1],
            times: [0, 0.45, 1],
          },
        })
        .then(() => {
          posRef.current = { x: destX, y: destY };
          setCssPos({ x: destX, y: destY });

          // Land with flare + settle
          setEagleState("perched");
          controls
            .start({
              y: [destY, destY - 10, destY + 3, destY],
              rotate: [0, 0],
              transition: { duration: 0.38, ease: "easeOut" },
            })
            .then(() => {
              isAnimating.current = false;

              // Show contact bubble?
              const t = e.target as HTMLElement;
              const isContact =
                t.closest("button") || t.closest("a") ||
                t.closest("input") || t.closest("textarea") ||
                t.closest("#contact") || t.closest("[data-testid*='book']");
              if (isContact) {
                setShowBubble(true);
                bubbleTimer.current = setTimeout(() => setShowBubble(false), 3200);
              }

              startIdle();
            });
        });
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
      if (bubbleTimer.current) clearTimeout(bubbleTimer.current);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [controls, startIdle]);

  return (
    <motion.div
      className="fixed z-[9998] pointer-events-none select-none"
      style={{ left: 0, top: 0, x: cssPos.x, y: cssPos.y }}
      animate={controls}
    >
      {/* Speech bubble */}
      {showBubble && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap px-3.5 py-2 rounded-full text-[11px] font-black tracking-wide"
          style={{
            background: "linear-gradient(135deg, #CAA353, #F0C97A)",
            color: "#0c0c0e",
            boxShadow: "0 4px 20px rgba(202,163,83,0.45)",
          }}
        >
          Let's connect! 🎯
          <div
            className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
            style={{ borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "6px solid #CAA353" }}
          />
        </motion.div>
      )}

      <EagleSVG state={eagleState} facingLeft={facingLeft} wingPhase={wingPhase} />
    </motion.div>
  );
}
