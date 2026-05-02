import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";

// ─── Eagle cry ───────────────────────────────────────────────────────────────
function playEagleCry() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const master = ctx.createGain();
    master.gain.value = 0.16;
    master.connect(ctx.destination);

    const osc1 = ctx.createOscillator();
    const g1 = ctx.createGain();
    osc1.type = "sawtooth";
    osc1.frequency.setValueAtTime(1100, ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(360, ctx.currentTime + 0.3);
    osc1.frequency.setValueAtTime(680, ctx.currentTime + 0.32);
    osc1.frequency.exponentialRampToValueAtTime(240, ctx.currentTime + 0.72);
    g1.gain.setValueAtTime(0, ctx.currentTime);
    g1.gain.linearRampToValueAtTime(1, ctx.currentTime + 0.03);
    g1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.74);
    osc1.connect(g1); g1.connect(master);
    osc1.start(); osc1.stop(ctx.currentTime + 0.74);

    const osc2 = ctx.createOscillator();
    const g2 = ctx.createGain();
    osc2.type = "square";
    osc2.frequency.setValueAtTime(560, ctx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.55);
    g2.gain.setValueAtTime(0, ctx.currentTime);
    g2.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.04);
    g2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    osc2.connect(g2); g2.connect(master);
    osc2.start(); osc2.stop(ctx.currentTime + 0.6);
  } catch (_) {}
}

// ─── Gold particle trail ─────────────────────────────────────────────────────
interface Particle { id: number; x: number; y: number; r: number }

function Particles({ list }: { list: Particle[] }) {
  return (
    <>
      {list.map((p) => (
        <motion.div
          key={p.id}
          className="fixed rounded-full pointer-events-none"
          style={{
            left: p.x, top: p.y, width: p.r, height: p.r,
            background: "radial-gradient(circle, rgba(202,163,83,0.55) 0%, transparent 100%)",
            zIndex: 9996,
          }}
          initial={{ opacity: 0.7, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
    </>
  );
}

// ─── Eagle SVG — flying / hovering ───────────────────────────────────────────
function FlyingEagle({ fast, facingLeft }: { fast: boolean; facingLeft: boolean }) {
  const flip = facingLeft ? { transform: "scaleX(-1)", transformOrigin: "50% 50%" } : {};
  return (
    <svg width="104" height="56" viewBox="0 0 104 56" fill="none" style={flip}>
      <defs>
        <linearGradient id="flWL" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#28282c" />
          <stop offset="100%" stopColor="#0e0e10" />
        </linearGradient>
        <linearGradient id="flWR" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#28282c" />
          <stop offset="100%" stopColor="#0e0e10" />
        </linearGradient>
        <linearGradient id="flBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#242428" />
          <stop offset="100%" stopColor="#111114" />
        </linearGradient>
        <radialGradient id="flEye" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFBB33" />
          <stop offset="55%" stopColor="#E09000" />
          <stop offset="100%" stopColor="#C07000" stopOpacity="0" />
        </radialGradient>
        <filter id="flGlow">
          <feGaussianBlur stdDeviation="2.8" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="flShadow">
          <feDropShadow dx="0" dy="5" stdDeviation="7" floodColor="#000" floodOpacity="0.92" />
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.6" />
        </filter>
      </defs>

      <g filter="url(#flShadow)">
        {/* LEFT WING */}
        <motion.g
          style={{ originX: "52px", originY: "32px" }}
          animate={{ rotate: fast ? [-22, 22, -22] : [-9, 9, -9] }}
          transition={{ duration: fast ? 0.34 : 2.9, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M52 30 C42 24 30 17 16 13 C10 11 3 12 0 16 C7 17 16 19 27 23 C38 27 46 29 52 33" fill="url(#flWL)" />
          {/* Primary feather fingers */}
          <path d="M4 16 C2 12 0 10 0 16" fill="#121214" />
          <path d="M11 13.5 C9 9 6 8 4 11" fill="#121214" />
          <path d="M18 11.5 C16 7 13 6 12 9" fill="#151518" />
          <path d="M25 10 C24 6 21 5.5 21 8" fill="#181820" />
          {/* Covert feather lines */}
          <path d="M52 31 C42 27 32 23 22 19" stroke="#0a0a0c" strokeWidth="0.9" opacity="0.45" />
          <path d="M52 32 C40 29 30 26 20 22" stroke="#252528" strokeWidth="0.5" opacity="0.25" />
        </motion.g>

        {/* RIGHT WING */}
        <motion.g
          style={{ originX: "52px", originY: "32px" }}
          animate={{ rotate: fast ? [22, -22, 22] : [9, -9, 9] }}
          transition={{ duration: fast ? 0.34 : 2.9, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M52 30 C62 24 74 17 88 13 C94 11 101 12 104 16 C97 17 88 19 77 23 C66 27 58 29 52 33" fill="url(#flWR)" />
          <path d="M100 16 C102 12 104 10 104 16" fill="#121214" />
          <path d="M93 13.5 C95 9 98 8 100 11" fill="#121214" />
          <path d="M86 11.5 C88 7 91 6 92 9" fill="#151518" />
          <path d="M79 10 C80 6 83 5.5 83 8" fill="#181820" />
          <path d="M52 31 C62 27 72 23 82 19" stroke="#0a0a0c" strokeWidth="0.9" opacity="0.45" />
          <path d="M52 32 C64 29 74 26 84 22" stroke="#252528" strokeWidth="0.5" opacity="0.25" />
        </motion.g>

        {/* Body */}
        <ellipse cx="60" cy="32" rx="13" ry="7" fill="url(#flBody)" />
        {/* Tail fan */}
        <path d="M47 35 C43 41 45 47 50 44 C51 40 52 37 54 34" fill="#121214" />
        <path d="M49 35 C45 43 48 48 53 46 C53 41 54 38 56 34" fill="#1e1e20" opacity="0.45" />

        {/* Head */}
        <circle cx="72" cy="26" r="10" fill="#1e1e22" />
        <circle cx="72" cy="26" r="10" fill="#2c2c30" opacity="0.3" />

        {/* Beak — hooked tip */}
        <path d="M81 23.5 L93 23 L81 27 C83 26 83 24.5 81 23.5Z" fill="#DAA520" />
        <path d="M81 26 L89 26.5 L81 27.5Z" fill="#B8860B" />

        {/* Eye glow bloom */}
        <circle cx="75.5" cy="23" r="6.5" fill="url(#flEye)" filter="url(#flGlow)" opacity="0.5" />
        {/* Iris */}
        <circle cx="75.5" cy="23" r="3.8" fill="#F5A623" />
        {/* Pupil */}
        <circle cx="75.5" cy="23" r="1.8" fill="#0f0800" />
        {/* Specular */}
        <circle cx="76.4" cy="22.2" r="0.75" fill="rgba(255,255,255,0.8)" />

        {/* Brow ridge — fierce */}
        <path d="M70.5 19 C72.5 17.2 76 17 79 18.5" stroke="#080808" strokeWidth="1.9" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}

// ─── Eagle SVG — perched ─────────────────────────────────────────────────────
function PerchedEagle() {
  return (
    <svg width="68" height="86" viewBox="0 0 68 86" fill="none">
      <defs>
        <linearGradient id="pBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#272729" />
          <stop offset="100%" stopColor="#0f0f11" />
        </linearGradient>
        <linearGradient id="pWing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#202024" />
          <stop offset="100%" stopColor="#0d0d0f" />
        </linearGradient>
        <radialGradient id="pEye" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFBB33" />
          <stop offset="60%" stopColor="#E09000" />
          <stop offset="100%" stopColor="#B07000" stopOpacity="0" />
        </radialGradient>
        <filter id="pGlow">
          <feGaussianBlur stdDeviation="3.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="pShadow">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000" floodOpacity="0.95" />
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.55" />
        </filter>
      </defs>

      <g filter="url(#pShadow)">
        {/* Tail fan */}
        <path d="M23 60 C19 70 22 78 30 76 C35 74 38 70 36 60" fill="#0e0e10" />
        <path d="M25 60 C22 69 25 76 33 74 C36 71 37 67 35 60" fill="#181820" opacity="0.5" />

        {/* Wing left — folded, feather layers */}
        <path d="M19 34 C11 37 9 49 13 58 C15 52 17 44 20 38" fill="url(#pWing)" />
        <path d="M18 37 C11 41 10 53 13 60" stroke="#1a1a1e" strokeWidth="1.1" strokeLinecap="round" fill="none" />
        <path d="M20 38 C13 42 13 53 16 60" stroke="#0c0c0e" strokeWidth="0.7" opacity="0.4" fill="none" />
        <path d="M17 45 C12 48 12 54 14 57" stroke="#242428" strokeWidth="0.6" opacity="0.25" fill="none" />

        {/* Wing right — folded */}
        <path d="M49 34 C57 37 59 49 55 58 C53 52 51 44 48 38" fill="url(#pWing)" />
        <path d="M50 37 C57 41 58 53 55 60" stroke="#1a1a1e" strokeWidth="1.1" strokeLinecap="round" fill="none" />
        <path d="M48 38 C55 42 55 53 52 60" stroke="#0c0c0e" strokeWidth="0.7" opacity="0.4" fill="none" />

        {/* Body */}
        <ellipse cx="34" cy="48" rx="15" ry="17" fill="url(#pBody)" />
        {/* Breast texture */}
        <ellipse cx="34" cy="52" rx="8" ry="10" fill="#1c1c20" opacity="0.55" />

        {/* Neck */}
        <ellipse cx="34" cy="29" rx="7.5" ry="8.5" fill="#1e1e22" />

        {/* Head */}
        <circle cx="34" cy="17" r="13" fill="#1f1f23" />
        <circle cx="34" cy="17" r="13" fill="#2e2e34" opacity="0.25" />

        {/* Hooked beak */}
        <path d="M44.5 15.5 L57 15 L44.5 19 C46 18 46.5 17 45.5 15.5Z" fill="#DAA520" />
        <path d="M44.5 18 L53 18.5 L44.5 19.5Z" fill="#A87200" />

        {/* Brow ridge — deeply fierce */}
        <path d="M39.5 12 C41.5 10 45.5 9.8 48 11.5" stroke="#070708" strokeWidth="2.4" strokeLinecap="round" fill="none" />

        {/* Eye glow bloom */}
        <circle cx="42.5" cy="13.5" r="8" fill="url(#pEye)" filter="url(#pGlow)" opacity="0.42" />
        {/* Iris */}
        <circle cx="42.5" cy="13.5" r="5" fill="#F5A623" />
        {/* Pupil */}
        <circle cx="42.5" cy="13.5" r="2.5" fill="#0f0800" />
        {/* Specular */}
        <circle cx="43.5" cy="12.6" r="0.9" fill="rgba(255,255,255,0.85)" />

        {/* Legs */}
        <line x1="28" y1="65" x2="25" y2="76" stroke="#3a3a3e" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="40" y1="65" x2="43" y2="76" stroke="#3a3a3e" strokeWidth="2.2" strokeLinecap="round" />
        {/* Talons — 4 per foot */}
        <path d="M25 76 L21 81 M25 76 L24 82 M25 76 L28 81 M25 76 L29 79" stroke="#484850" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M43 76 L39 81 M43 76 L42 82 M43 76 L46 81 M43 76 L47 79" stroke="#484850" strokeWidth="1.8" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// ─── APEX Name Tooltip ────────────────────────────────────────────────────────
function ApexTooltip({ visible, above }: { visible: boolean; above: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="apex"
          initial={{ opacity: 0, y: above ? 6 : -6, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: above ? 6 : -6, scale: 0.94 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
          style={{ [above ? "bottom" : "top"]: "calc(100% + 10px)" }}
        >
          <div
            className="flex flex-col items-center gap-px px-4 py-2.5"
            style={{
              background: "rgba(8, 8, 10, 0.88)",
              backdropFilter: "blur(20px) saturate(180%)",
              border: "1px solid rgba(202, 163, 83, 0.22)",
              borderRadius: "6px",
              boxShadow: "0 12px 40px rgba(0,0,0,0.7), 0 2px 8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            <span
              className="text-[11px] font-black tracking-[0.28em] uppercase"
              style={{ color: "#CAA353", letterSpacing: "0.28em" }}
            >
              APEX
            </span>
            <div className="w-full h-[1px] my-1" style={{ background: "rgba(202,163,83,0.15)" }} />
            <span className="text-[9px] font-medium tracking-[0.18em] uppercase" style={{ color: "rgba(255,255,255,0.28)" }}>
              Next Edge Mascot
            </span>
          </div>
          {/* Arrow pointing toward eagle */}
          {above ? (
            <div className="w-0 h-0 mx-auto" style={{ borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderBottom: "5px solid rgba(202,163,83,0.22)" }} />
          ) : (
            <div className="w-0 h-0 mx-auto" style={{ borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "5px solid rgba(202,163,83,0.22)" }} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Contact prompt ───────────────────────────────────────────────────────────
function ContactPrompt({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="contact"
          initial={{ opacity: 0, y: 8, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
          style={{ bottom: "calc(100% + 10px)" }}
        >
          <div
            className="flex items-center gap-2.5 px-4 py-2"
            style={{
              background: "rgba(8, 8, 10, 0.9)",
              backdropFilter: "blur(24px) saturate(200%)",
              border: "1px solid rgba(202, 163, 83, 0.3)",
              borderRadius: "5px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#CAA353", boxShadow: "0 0 6px rgba(202,163,83,0.8)" }} />
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase" style={{ color: "rgba(255,255,255,0.65)" }}>
              Start a project
            </span>
            <span className="text-[10px]" style={{ color: "rgba(202,163,83,0.7)" }}>→</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const NAV_EAGLE_SCALE = 0.46;

// ─── Main Component ───────────────────────────────────────────────────────────
export function EagleMascot() {
  const controls = useAnimation();
  const [eagleState, setEagleState] = useState<"hovering" | "flying" | "perched">("hovering");
  const [facingLeft, setFacingLeft] = useState(false);
  const [showApex, setShowApex] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [inNavMode, setInNavMode] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleId = useRef(0);

  const posRef = useRef({ x: window.innerWidth - 148, y: 58 });
  const [cssPos, setCssPos] = useState({ x: window.innerWidth - 148, y: 58 });
  const animating = useRef(false);
  const navMode = useRef(false);
  const lastFullPos = useRef({ x: window.innerWidth - 148, y: 58 });

  const bubbleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const trailTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const navLeaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Proximity detection for APEX label ──
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (animating.current) return;
      const cx = posRef.current.x + (eagleState === "perched" ? 34 : 52);
      const cy = posRef.current.y + (eagleState === "perched" ? 43 : 28);
      const d = Math.hypot(e.clientX - cx, e.clientY - cy);
      setShowApex(d < 70);
    };
    document.addEventListener("mousemove", onMove);
    return () => document.removeEventListener("mousemove", onMove);
  }, [eagleState]);

  const startIdle = useCallback(() => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      if (!animating.current) setEagleState("hovering");
    }, 2000);
  }, []);

  useEffect(() => { setState("hovering"); }, []);

  // ── Nav perch: glide to hovered nav link ──
  useEffect(() => {
    const EAGLE_W = 104 * NAV_EAGLE_SCALE; // ~48px
    const EAGLE_H = 56 * NAV_EAGLE_SCALE;  // ~26px

    const glideToLink = (el: HTMLElement) => {
      if (animating.current) return;
      if (navLeaveTimer.current) clearTimeout(navLeaveTimer.current);

      const rect = el.getBoundingClientRect();
      const destX = rect.left + rect.width / 2 - EAGLE_W / 2;
      const destY = rect.top + rect.height / 2 - EAGLE_H / 2 - 6;

      // Save position before entering nav for the first time
      if (!navMode.current) {
        lastFullPos.current = { ...posRef.current };
        navMode.current = true;
        setInNavMode(true);
        setEagleState("hovering");
        setShowApex(false);
        setShowContact(false);
      }

      const dx = destX - posRef.current.x;
      setFacingLeft(dx < -10);

      controls.start({
        x: destX,
        y: destY,
        rotate: 0,
        scale: NAV_EAGLE_SCALE,
        transition: { duration: 0.24, ease: [0.16, 1, 0.3, 1] },
      }).then(() => {
        posRef.current = { x: destX, y: destY };
        setCssPos({ x: destX, y: destY });
      });
    };

    const onNavLeave = () => {
      if (!navMode.current) return;
      if (navLeaveTimer.current) clearTimeout(navLeaveTimer.current);
      navLeaveTimer.current = setTimeout(() => {
        navMode.current = false;
        setInNavMode(false);
        const dest = lastFullPos.current;
        controls.start({
          x: dest.x,
          y: dest.y,
          scale: 1,
          rotate: 0,
          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
        }).then(() => {
          posRef.current = dest;
          setCssPos(dest);
          startIdle();
        });
      }, 110);
    };

    // Attach listeners after DOM mounts
    const attach = () => {
      const items = document.querySelectorAll<HTMLElement>("[data-nav-item]");
      const container = document.querySelector<HTMLElement>("[data-nav-container]");
      items.forEach((el) => el.addEventListener("mouseenter", () => glideToLink(el)));
      if (container) container.addEventListener("mouseleave", onNavLeave);
    };
    const t = setTimeout(attach, 500);

    return () => {
      clearTimeout(t);
      if (navLeaveTimer.current) clearTimeout(navLeaveTimer.current);
    };
  }, [controls, startIdle]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // Exit nav mode immediately if active
      if (navMode.current) {
        navMode.current = false;
        setInNavMode(false);
      }
      if (animating.current) return;

      const vw = window.innerWidth, vh = window.innerHeight;
      const destX = Math.max(12, Math.min(e.clientX - 52, vw - 120));
      const destY = Math.max(12, Math.min(e.clientY - 48, vh - 92));

      const dx = destX - posRef.current.x;
      const dy = destY - posRef.current.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 16) return;

      setFacingLeft(dx < 0);
      animating.current = true;
      setEagleState("flying");
      setShowApex(false);
      setShowContact(false);
      if (bubbleTimer.current) clearTimeout(bubbleTimer.current);
      playEagleCry();

      const arcLift = Math.min(dist * 0.3, 170);
      const midX = (posRef.current.x + destX) / 2;
      const midY = Math.min(posRef.current.y, destY) - arcLift;
      const bank = Math.max(-26, Math.min(26, dx * 0.048));
      const dur = Math.max(0.48, Math.min(0.5 + dist / 2200, 1.1));

      // Trail along bezier
      let t = 0;
      const step = 90;
      if (trailTimer.current) clearInterval(trailTimer.current);
      trailTimer.current = setInterval(() => {
        t += step;
        const pct = Math.min(t / (dur * 1000), 1);
        const px = (1 - pct) ** 2 * posRef.current.x + 2 * (1 - pct) * pct * midX + pct ** 2 * destX;
        const py = (1 - pct) ** 2 * posRef.current.y + 2 * (1 - pct) * pct * midY + pct ** 2 * destY;
        setParticles((prev) => [
          ...prev.slice(-16),
          { id: particleId.current++, x: px + 40 + (Math.random() - 0.5) * 20, y: py + 30 + (Math.random() - 0.5) * 14, r: 3 + Math.random() * 5 },
        ]);
        if (t >= dur * 1000) clearInterval(trailTimer.current!);
      }, step);

      const fromScale = navMode.current ? NAV_EAGLE_SCALE : 1;
      controls
        .start({
          x: [posRef.current.x, midX, destX],
          y: [posRef.current.y, midY, destY],
          rotate: [0, bank, 0],
          scale: [fromScale, 1.07, 1],
          transition: { duration: dur, ease: [0.25, 0.46, 0.45, 0.94], times: [0, 0.43, 1] },
        })
        .then(() => {
          posRef.current = { x: destX, y: destY };
          setCssPos({ x: destX, y: destY });
          setEagleState("perched");

          controls
            .start({
              y: [destY, destY - 14, destY + 5, destY - 3, destY],
              scale: [1, 1, 1, 1, 1],
              transition: { duration: 0.44, ease: "easeOut" },
            })
            .then(() => {
              animating.current = false;
              const t = e.target as HTMLElement;
              const isAction = t.closest("button") || t.closest("a") || t.closest("input") || t.closest("textarea") || t.closest("#contact");
              if (isAction) {
                setShowContact(true);
                bubbleTimer.current = setTimeout(() => setShowContact(false), 3800);
              }
              startIdle();
            });
        });
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      if (bubbleTimer.current) clearTimeout(bubbleTimer.current);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      if (trailTimer.current) clearInterval(trailTimer.current);
    };
  }, [controls, startIdle]);

  function setState(s: "hovering" | "flying" | "perched") { setEagleState(s); }

  const apexAbove = cssPos.y > 80;

  return (
    <>
      <Particles list={particles} />

      <motion.div
        className="fixed z-[9998] pointer-events-none select-none"
        style={{ left: 0, top: 0, x: cssPos.x, y: cssPos.y }}
        animate={controls}
      >
        {/* Subtle ground glow */}
        <div
          style={{
            position: "absolute",
            bottom: -8,
            left: "50%",
            transform: "translateX(-50%)",
            width: eagleState === "perched" ? 44 : 88,
            height: eagleState === "perched" ? 18 : 24,
            background: "radial-gradient(ellipse, rgba(202,163,83,0.12) 0%, transparent 70%)",
            filter: "blur(8px)",
            transition: "all 0.6s ease",
            pointerEvents: "none",
          }}
        />

        {/* APEX tooltip */}
        <ApexTooltip visible={showApex && !animating.current && !inNavMode} above={apexAbove} />

        {/* Contact prompt */}
        <ContactPrompt visible={showContact} />

        {/* Eagle body — idle hover float */}
        <motion.div
          animate={eagleState !== "flying" ? { y: [0, -5, 0] } : {}}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        >
          {eagleState === "perched"
            ? <PerchedEagle />
            : <FlyingEagle fast={eagleState === "flying"} facingLeft={facingLeft} />
          }
        </motion.div>
      </motion.div>
    </>
  );
}
