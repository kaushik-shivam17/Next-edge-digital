import { motion, useAnimation, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";

// ─── Eagle cry ──────────────────────────────────────────────────────────────
function playEagleCry() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const master = ctx.createGain();
    master.gain.value = 0.18;
    master.connect(ctx.destination);

    // Screech oscillator
    const o1 = ctx.createOscillator();
    const g1 = ctx.createGain();
    o1.type = "sawtooth";
    o1.frequency.setValueAtTime(1200, ctx.currentTime);
    o1.frequency.exponentialRampToValueAtTime(380, ctx.currentTime + 0.28);
    o1.frequency.setValueAtTime(700, ctx.currentTime + 0.3);
    o1.frequency.exponentialRampToValueAtTime(250, ctx.currentTime + 0.7);
    g1.gain.setValueAtTime(0, ctx.currentTime);
    g1.gain.linearRampToValueAtTime(1, ctx.currentTime + 0.03);
    g1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.75);
    o1.connect(g1); g1.connect(master);
    o1.start(); o1.stop(ctx.currentTime + 0.75);

    // Texture layer
    const o2 = ctx.createOscillator();
    const g2 = ctx.createGain();
    o2.type = "square";
    o2.frequency.setValueAtTime(600, ctx.currentTime);
    o2.frequency.exponentialRampToValueAtTime(190, ctx.currentTime + 0.55);
    g2.gain.setValueAtTime(0, ctx.currentTime);
    g2.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.04);
    g2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    o2.connect(g2); g2.connect(master);
    o2.start(); o2.stop(ctx.currentTime + 0.6);
  } catch (_) {}
}

// ─── Particle trail ──────────────────────────────────────────────────────────
interface Particle { id: number; x: number; y: number; size: number }

function TrailParticle({ x, y, size }: Particle) {
  return (
    <motion.div
      className="fixed z-[9997] rounded-full pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, background: "radial-gradient(circle, rgba(202,163,83,0.6) 0%, rgba(202,163,83,0) 100%)" }}
      initial={{ opacity: 0.8, scale: 1 }}
      animate={{ opacity: 0, scale: 0.2 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    />
  );
}

// ─── Premium Eagle SVG ───────────────────────────────────────────────────────
function FlyingEagle({ fast, facingLeft }: { fast: boolean; facingLeft: boolean }) {
  const flip = facingLeft ? { transform: "scaleX(-1)", transformOrigin: "50% 50%" } : {};
  return (
    <svg width="96" height="52" viewBox="0 0 96 52" fill="none" style={flip}>
      <defs>
        <linearGradient id="wgL" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2a2a2e" />
          <stop offset="60%" stopColor="#1a1a1e" />
          <stop offset="100%" stopColor="#0d0d10" />
        </linearGradient>
        <linearGradient id="wgR" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2a2a2e" />
          <stop offset="60%" stopColor="#1a1a1e" />
          <stop offset="100%" stopColor="#0d0d10" />
        </linearGradient>
        <linearGradient id="bodyG" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#252528" />
          <stop offset="100%" stopColor="#111114" />
        </linearGradient>
        <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFB020" stopOpacity="1" />
          <stop offset="60%" stopColor="#E08800" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#CC7700" stopOpacity="0" />
        </radialGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="eagleShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.9" />
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.7" />
        </filter>
      </defs>

      <g filter="url(#eagleShadow)">
        {/* ── LEFT WING ── */}
        <motion.g
          animate={{ rotate: fast ? [-18, 18, -18] : [-8, 8, -8] }}
          transition={{ duration: fast ? 0.35 : 2.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: "48px", originY: "30px" }}
        >
          {/* Main wing surface */}
          <path d="M48 28 C38 22 26 16 14 12 C8 10 2 12 0 16 C7 16 16 18 26 22 C36 26 44 28 48 32" fill="url(#wgL)" />
          {/* Primary feathers (finger tips) */}
          <path d="M8 14 C4 10 0 9 0 16" fill="#151518" />
          <path d="M14 12 C11 8 7 6 4 10" fill="#151518" />
          <path d="M20 11 C18 7 14 5 12 8" fill="#151518" />
          <path d="M26 10 C25 6 21 5 20 8" fill="#1a1a1e" />
          {/* Wing covert lines for realism */}
          <path d="M48 30 C40 26 30 22 20 18" stroke="#0a0a0d" strokeWidth="0.8" opacity="0.5" />
          <path d="M48 31 C38 28 28 25 18 22" stroke="#2a2a2e" strokeWidth="0.6" opacity="0.3" />
        </motion.g>

        {/* ── RIGHT WING ── */}
        <motion.g
          animate={{ rotate: fast ? [18, -18, 18] : [8, -8, 8] }}
          transition={{ duration: fast ? 0.35 : 2.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: "48px", originY: "30px" }}
        >
          <path d="M48 28 C58 22 70 16 82 12 C88 10 94 12 96 16 C89 16 80 18 70 22 C60 26 52 28 48 32" fill="url(#wgR)" />
          <path d="M88 14 C92 10 96 9 96 16" fill="#151518" />
          <path d="M82 12 C85 8 89 6 92 10" fill="#151518" />
          <path d="M76 11 C78 7 82 5 84 8" fill="#151518" />
          <path d="M70 10 C71 6 75 5 76 8" fill="#1a1a1e" />
          <path d="M48 30 C56 26 66 22 76 18" stroke="#0a0a0d" strokeWidth="0.8" opacity="0.5" />
          <path d="M48 31 C58 28 68 25 78 22" stroke="#2a2a2e" strokeWidth="0.6" opacity="0.3" />
        </motion.g>

        {/* Body */}
        <ellipse cx="55" cy="30" rx="12" ry="6.5" fill="url(#bodyG)" />
        {/* Tail fan */}
        <path d="M43 32 C39 38 41 43 46 41 C47 38 48 35 50 32" fill="#151518" />
        <path d="M44 32 C40 40 43 45 48 43 C48 39 49 36 51 32" fill="#1a1a1e" opacity="0.5" />
        {/* Head */}
        <circle cx="66" cy="24" r="9" fill="#1e1e22" />
        {/* White-ish head highlight for bald eagle feel */}
        <circle cx="66" cy="24" r="9" fill="#2a2a2e" opacity="0.4" />
        {/* Beak */}
        <path d="M74 22.5 L84 22 L74 25.5 C75 24.5 75 23.5 74 22.5Z" fill="#DAA520" />
        <path d="M74 24 L80 24.5 L74 25.5Z" fill="#B8860B" />
        {/* Eye glow */}
        <circle cx="69" cy="21.5" r="5" fill="url(#eyeGlow)" filter="url(#glow)" opacity="0.6" />
        <circle cx="69" cy="21.5" r="3.2" fill="#F5A623" />
        <circle cx="69" cy="21.5" r="1.6" fill="#1a0a00" />
        <circle cx="69.7" cy="20.9" r="0.7" fill="rgba(255,255,255,0.75)" />
        {/* Brow ridge */}
        <path d="M65 18.5 C67 17 70.5 17 73 18.5" stroke="#0d0d10" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}

function PerchedEagle() {
  return (
    <svg width="64" height="82" viewBox="0 0 64 82" fill="none">
      <defs>
        <linearGradient id="pBodyG" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#252528" />
          <stop offset="100%" stopColor="#101012" />
        </linearGradient>
        <radialGradient id="pEyeG" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFB020" />
          <stop offset="70%" stopColor="#E08800" />
          <stop offset="100%" stopColor="#CC7700" />
        </radialGradient>
        <filter id="pGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="pShadow">
          <feDropShadow dx="0" dy="5" stdDeviation="7" floodColor="#000" floodOpacity="0.95" />
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.6" />
        </filter>
        <linearGradient id="wingFold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#222225" />
          <stop offset="100%" stopColor="#0e0e10" />
        </linearGradient>
      </defs>
      <g filter="url(#pShadow)">
        {/* Tail feathers layered */}
        <path d="M22 58 C18 68 21 76 28 74 C32 72 36 68 34 58" fill="#101012" />
        <path d="M24 58 C21 67 24 74 32 72 C35 70 36 66 34 58" fill="#151518" opacity="0.7" />
        {/* Wing left folded — feather layers */}
        <path d="M18 32 C10 35 8 46 11 55 C13 50 15 44 18 38" fill="url(#wingFold)" />
        <path d="M17 35 C9 39 8 50 11 57" stroke="#1a1a1e" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        <path d="M19 35 C12 39 11 50 14 57" stroke="#0d0d10" strokeWidth="0.8" opacity="0.5" fill="none" />
        {/* Wing right folded */}
        <path d="M46 32 C54 35 56 46 53 55 C51 50 49 44 46 38" fill="url(#wingFold)" />
        <path d="M47 35 C55 39 56 50 53 57" stroke="#1a1a1e" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        {/* Main body */}
        <ellipse cx="32" cy="46" rx="14" ry="16" fill="url(#pBodyG)" />
        {/* Breast highlight */}
        <ellipse cx="32" cy="50" rx="7" ry="9" fill="#1e1e22" opacity="0.7" />
        {/* Neck */}
        <ellipse cx="32" cy="28" rx="7" ry="8" fill="#1e1e22" />
        {/* Head */}
        <circle cx="32" cy="16" r="12" fill="#202024" />
        {/* Beak hooked */}
        <path d="M42 15 L54 14 L42 18 C43.5 17.5 44 16.5 43 15.5Z" fill="#DAA520" />
        <path d="M42 17 L50 17.5 L42 18.5Z" fill="#B8860B" />
        {/* Fierce brow cast */}
        <path d="M37 11 C39 9.2 43 9 46 10.5" stroke="#0d0d10" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        {/* Eye glow outer */}
        <circle cx="40" cy="13" r="7" fill="url(#pEyeG)" filter="url(#pGlow)" opacity="0.45" />
        {/* Eye iris */}
        <circle cx="40" cy="13" r="4.5" fill="#F5A623" />
        <circle cx="40" cy="13" r="2.2" fill="#1a0800" />
        <circle cx="41" cy="12.2" r="0.8" fill="rgba(255,255,255,0.8)" />
        {/* Legs */}
        <line x1="26" y1="62" x2="23" y2="73" stroke="#444" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="38" y1="62" x2="41" y2="73" stroke="#444" strokeWidth="2.2" strokeLinecap="round" />
        {/* Talons left */}
        <path d="M23 73 L19 78 M23 73 L22 79 M23 73 L26 78 M23 73 L27 76" stroke="#555" strokeWidth="1.8" strokeLinecap="round" />
        {/* Talons right */}
        <path d="M41 73 L37 78 M41 73 L40 79 M41 73 L44 78 M41 73 L45 76" stroke="#555" strokeWidth="1.8" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export function EagleMascot() {
  const controls = useAnimation();
  const [state, setState] = useState<"hovering" | "flying" | "perched">("hovering");
  const [facingLeft, setFacingLeft] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showBubble, setShowBubble] = useState(false);
  const particleId = useRef(0);

  const posRef = useRef({ x: window.innerWidth - 140, y: 64 });
  const [cssPos, setCssPos] = useState({ x: window.innerWidth - 140, y: 64 });
  const animating = useRef(false);
  const bubbleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const particleInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const addParticles = useCallback((x: number, y: number) => {
    const newParticles: Particle[] = Array.from({ length: 3 }, () => ({
      id: particleId.current++,
      x: x + Math.random() * 30 - 15,
      y: y + Math.random() * 20 - 10,
      size: 4 + Math.random() * 6,
    }));
    setParticles((p) => [...p.slice(-18), ...newParticles]);
  }, []);

  const startIdle = useCallback(() => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      if (!animating.current) setState("hovering");
    }, 1800);
  }, []);

  useEffect(() => {
    setState("hovering");
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (animating.current) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const destX = Math.max(12, Math.min(e.clientX - 48, vw - 112));
      const destY = Math.max(12, Math.min(e.clientY - 46, vh - 90));

      const dx = destX - posRef.current.x;
      const dy = destY - posRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 16) return;

      setFacingLeft(dx < 0);
      animating.current = true;
      setState("flying");
      playEagleCry();
      if (bubbleTimer.current) clearTimeout(bubbleTimer.current);
      setShowBubble(false);

      // Arc midpoint — always lifts above both start and end
      const arcLift = Math.min(dist * 0.32, 180);
      const midX = (posRef.current.x + destX) / 2;
      const midY = Math.min(posRef.current.y, destY) - arcLift;
      const bank = Math.max(-28, Math.min(28, dx * 0.05));
      const dur = Math.min(0.48 + dist / 2400, 1.15);

      // Particle trail during flight
      let elapsed = 0;
      particleInterval.current = setInterval(() => {
        elapsed += 80;
        const t = Math.min(elapsed / (dur * 1000), 1);
        // Quadratic bezier approximation for particle position
        const px = (1 - t) * (1 - t) * posRef.current.x + 2 * (1 - t) * t * midX + t * t * destX;
        const py = (1 - t) * (1 - t) * posRef.current.y + 2 * (1 - t) * t * midY + t * t * destY;
        addParticles(px + 48, py + 46);
        if (elapsed >= dur * 1000) {
          clearInterval(particleInterval.current!);
        }
      }, 80);

      controls
        .start({
          x: [posRef.current.x, midX, destX],
          y: [posRef.current.y, midY, destY],
          rotate: [0, bank, 0],
          scale: [1, 1.08, 1],
          transition: { duration: dur, ease: [0.25, 0.46, 0.45, 0.94], times: [0, 0.42, 1] },
        })
        .then(() => {
          posRef.current = { x: destX, y: destY };
          setCssPos({ x: destX, y: destY });
          setState("perched");

          // Landing settle
          controls
            .start({
              y: [destY, destY - 12, destY + 4, destY - 2, destY],
              transition: { duration: 0.45, ease: "easeOut" },
            })
            .then(() => {
              animating.current = false;
              const t = e.target as HTMLElement;
              const isCtaClick =
                t.closest("button") || t.closest("a") ||
                t.closest("input") || t.closest("textarea") ||
                t.closest("#contact");
              if (isCtaClick) {
                setShowBubble(true);
                bubbleTimer.current = setTimeout(() => setShowBubble(false), 3500);
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
      if (particleInterval.current) clearInterval(particleInterval.current);
    };
  }, [controls, addParticles, startIdle]);

  // Remove old particles
  useEffect(() => {
    const t = setTimeout(() => {
      setParticles((p) => p.filter((_, i) => i > p.length - 20));
    }, 700);
    return () => clearTimeout(t);
  }, [particles]);

  return (
    <>
      {/* Particle trail */}
      {particles.map((p) => <TrailParticle key={p.id} {...p} />)}

      <motion.div
        className="fixed z-[9998] pointer-events-none select-none"
        style={{ left: 0, top: 0, x: cssPos.x, y: cssPos.y }}
        animate={controls}
      >
        {/* Glow aura under eagle */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: state === "perched" ? 40 : 80,
            height: state === "perched" ? 20 : 30,
            left: "50%",
            bottom: -6,
            transform: "translateX(-50%)",
            background: "radial-gradient(ellipse, rgba(202,163,83,0.18) 0%, transparent 70%)",
            filter: "blur(6px)",
            transition: "all 0.5s ease",
          }}
        />

        {/* Speech bubble */}
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, scale: 0.65, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap px-3.5 py-2 rounded-full text-[11px] font-black tracking-wide"
            style={{
              background: "linear-gradient(135deg, #CAA353 0%, #F0C97A 100%)",
              color: "#0c0c0e",
              boxShadow: "0 4px 24px rgba(202,163,83,0.5), 0 0 0 1px rgba(202,163,83,0.3)",
            }}
          >
            Let's connect! 🎯
            <div
              className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
              style={{ borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "6px solid #CAA353" }}
            />
          </motion.div>
        )}

        {/* Eagle */}
        <motion.div
          animate={state === "perched" ? {} : { y: [0, -4, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {state === "perched"
            ? <PerchedEagle />
            : <FlyingEagle fast={state === "flying"} facingLeft={facingLeft} />
          }
        </motion.div>
      </motion.div>
    </>
  );
}
