import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";

// ─── Sound ───────────────────────────────────────────────────────────────────
function playEagleCry() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const master = ctx.createGain(); master.gain.value = 0.14; master.connect(ctx.destination);
    const o1 = ctx.createOscillator(); const g1 = ctx.createGain();
    o1.type = "sawtooth";
    o1.frequency.setValueAtTime(1100, ctx.currentTime);
    o1.frequency.exponentialRampToValueAtTime(360, ctx.currentTime + 0.3);
    o1.frequency.setValueAtTime(680, ctx.currentTime + 0.32);
    o1.frequency.exponentialRampToValueAtTime(240, ctx.currentTime + 0.72);
    g1.gain.setValueAtTime(0, ctx.currentTime); g1.gain.linearRampToValueAtTime(1, ctx.currentTime + 0.03);
    g1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.74);
    o1.connect(g1); g1.connect(master); o1.start(); o1.stop(ctx.currentTime + 0.74);
  } catch (_) {}
}

// ─── Particles ───────────────────────────────────────────────────────────────
interface Particle { id: number; x: number; y: number; r: number }
function Particles({ list }: { list: Particle[] }) {
  return (
    <>
      {list.map((p) => (
        <motion.div key={p.id} className="fixed rounded-full pointer-events-none"
          style={{ left: p.x, top: p.y, width: p.r, height: p.r, zIndex: 9994,
            background: "radial-gradient(circle, rgba(202,163,83,0.5) 0%, transparent 100%)" }}
          initial={{ opacity: 0.65, scale: 1 }} animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }} />
      ))}
    </>
  );
}

// ─── SOARING Eagle (front-facing, patrol) ────────────────────────────────────
// Bold black silhouette — heraldic displayed eagle style (like the reference)
function SoaringEagle({ size = 1 }: { size?: number }) {
  return (
    <svg
      width={110 * size} height={82 * size}
      viewBox="0 0 110 82"
      fill="#0a0a0c"
      style={{ filter: "drop-shadow(0 5px 18px rgba(0,0,0,0.95)) drop-shadow(0 2px 6px rgba(0,0,0,0.8))" }}
    >
      {/* ─ HEAD ─ */}
      <ellipse cx="55" cy="14" rx="11" ry="13" />
      {/* Beak */}
      <path d="M64 11 C70 9 76 9 78 13 C74 18 68 19 64 17 Z" />

      {/* ─ BODY ─ */}
      <ellipse cx="55" cy="52" rx="9" ry="20" />
      {/* Chest fill between head and body */}
      <path d="M47 24 C45 34 45 48 47 58 C49 64 61 64 63 58 C65 48 65 34 63 24 C60 20 50 20 47 24 Z" />

      {/* ─ LEFT WING ─ (goes up-left, heraldic style) */}
      <path d="
        M 50 38
        C 40 32 28 24 14 16
        C 8 12 2 10 0 14
        C 4 10 8 4 14 4 C 13 12 11 16 8 18
        C 14 8 20 2 26 4 C 24 12 22 16 20 20
        C 26 10 32 4 38 6 C 36 14 34 20 30 24
        C 36 14 44 8 50 12 C 48 20 46 28 44 34
        C 48 26 54 22 58 26 C 56 32 54 36 52 40
        Z
      " />

      {/* ─ RIGHT WING ─ (mirror) */}
      <path d="
        M 60 38
        C 70 32 82 24 96 16
        C 102 12 108 10 110 14
        C 106 10 102 4 96 4 C 97 12 99 16 102 18
        C 96 8 90 2 84 4 C 86 12 88 16 90 20
        C 84 10 78 4 72 6 C 74 14 76 20 80 24
        C 74 14 66 8 60 12 C 62 20 64 28 66 34
        C 62 26 56 22 52 26 C 54 32 56 36 58 40
        Z
      " />

      {/* ─ TAIL ─ */}
      <path d="M 46 70 C 42 78 46 86 52 84 L 55 78 L 58 84 C 64 86 68 78 64 70 Z" />
    </svg>
  );
}

// ─── BANKING Eagle (side-view, directed flight) ──────────────────────────────
// Bold black silhouette, side profile
function BankingEagle({ facingLeft }: { facingLeft: boolean }) {
  const flip = facingLeft ? { transform: "scaleX(-1)", transformOrigin: "50% 50%" } : {};
  return (
    <svg width="108" height="58" viewBox="0 0 108 58" fill="#0a0a0c"
      style={{ ...flip, filter: "drop-shadow(0 5px 18px rgba(0,0,0,0.95)) drop-shadow(0 2px 6px rgba(0,0,0,0.8))" }}>
      {/* ─ UPPER WING ─ */}
      <path d="M54 26 C44 20 30 13 16 8 C8 5 2 4 0 9 C6 10 14 13 24 17 C36 22 46 26 54 30" />
      {/* Upper feather fingers */}
      <path d="M2 8 C0 3 0 0 3 0 C5 5 5 9 4 12 Z" />
      <path d="M10 5 C10 0 13 -1 16 1 C14 6 13 10 11 13 Z" />
      <path d="M20 3 C21 -1 25 -2 28 0 C25 5 24 9 22 12 Z" />
      <path d="M32 2 C34 -1 38 -1 40 2 C37 7 36 10 34 13 Z" />
      <path d="M44 4 C47 1 51 2 52 5 C49 9 47 12 46 15 Z" />
      {/* ─ LOWER WING ─ */}
      <path d="M54 26 C64 20 78 13 92 8 C100 5 106 4 108 9 C102 10 94 13 84 17 C72 22 62 26 54 30" />
      {/* Lower feather fingers */}
      <path d="M106 8 C108 3 108 0 105 0 C103 5 103 9 104 12 Z" />
      <path d="M98 5 C98 0 95 -1 92 1 C94 6 95 10 97 13 Z" />
      <path d="M88 3 C87 -1 83 -2 80 0 C83 5 84 9 86 12 Z" />
      <path d="M76 2 C74 -1 70 -1 68 2 C71 7 72 10 74 13 Z" />
      <path d="M64 4 C61 1 57 2 56 5 C59 9 61 12 62 15 Z" />
      {/* ─ BODY ─ */}
      <ellipse cx="62" cy="32" rx="11" ry="6" />
      {/* Tail fan */}
      <path d="M50 34 C46 40 48 46 54 44 C55 40 56 37 58 34" />
      <path d="M52 35 C47 43 50 50 56 47 C56 42 57 39 59 35" />
      <path d="M54 35 C50 44 53 51 59 48" />
      {/* ─ HEAD ─ */}
      <circle cx="74" cy="24" r="11" />
      {/* Beak - hooked */}
      <path d="M83 21 C90 19 98 19 100 23 C96 28 88 30 83 27 Z" />
      {/* Eye highlight (negative space) */}
      <circle cx="77" cy="21" r="3.5" fill="#1a1a1e" />
      <circle cx="77" cy="21" r="1.8" fill="#0a0a0c" />
    </svg>
  );
}

// ─── PERCHED Eagle ───────────────────────────────────────────────────────────
// Bold black silhouette — sitting upright
function PerchedEagle() {
  return (
    <svg width="72" height="90" viewBox="0 0 72 90" fill="#0a0a0c"
      style={{ filter: "drop-shadow(0 6px 20px rgba(0,0,0,0.95)) drop-shadow(0 2px 6px rgba(0,0,0,0.7))" }}>
      {/* TAIL */}
      <path d="M 22 62 C 18 73 21 82 28 80 L 36 74 L 44 80 C 51 82 54 73 50 62 Z" />
      {/* WING LEFT */}
      <path d="M 20 30 C 14 34 11 46 14 58 C 16 52 18 44 20 38" />
      <path d="M 18 32 C 10 38 8 52 12 60" stroke="#0a0a0c" strokeWidth="3" fill="none" />
      <path d="M 16 40 C 8 46 8 58 12 62" stroke="#141418" strokeWidth="2" fill="none" />
      {/* WING RIGHT */}
      <path d="M 52 30 C 58 34 61 46 58 58 C 56 52 54 44 52 38" />
      <path d="M 54 32 C 62 38 64 52 60 60" stroke="#0a0a0c" strokeWidth="3" fill="none" />
      {/* BODY */}
      <ellipse cx="36" cy="50" rx="16" ry="18" />
      {/* NECK */}
      <ellipse cx="36" cy="30" rx="8" ry="9" />
      {/* HEAD */}
      <circle cx="36" cy="16" r="14" />
      {/* BEAK - hooked */}
      <path d="M 47 13 C 54 10 62 10 65 14 C 61 20 53 22 47 19 Z" />
      {/* EYE */}
      <circle cx="42" cy="11" r="4" fill="#1a1a1e" />
      <circle cx="42" cy="11" r="2" fill="#0a0a0c" />
      {/* FIERCE BROW */}
      <path d="M 39 7 C 41 5.5 45 5 48 6.5" stroke="#050505" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* LEGS */}
      <line x1="30" y1="67" x2="27" y2="78" stroke="#2a2a2e" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="42" y1="67" x2="45" y2="78" stroke="#2a2a2e" strokeWidth="2.5" strokeLinecap="round" />
      {/* TALONS LEFT */}
      <path d="M 27 78 L 23 84 M 27 78 L 26 85 M 27 78 L 31 84 M 27 78 L 32 82"
        stroke="#3a3a3e" strokeWidth="2" strokeLinecap="round" />
      {/* TALONS RIGHT */}
      <path d="M 45 78 L 41 84 M 45 78 L 44 85 M 45 78 L 49 84 M 45 78 L 50 82"
        stroke="#3a3a3e" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ─── APEX Tooltip ────────────────────────────────────────────────────────────
function ApexTooltip({ visible, above }: { visible: boolean; above: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div key="apex"
          initial={{ opacity: 0, y: above ? 6 : -6, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none whitespace-nowrap"
          style={{ [above ? "bottom" : "top"]: "calc(100% + 10px)" }}
        >
          <div className="flex flex-col items-center gap-0.5 px-4 py-2.5"
            style={{
              background: "rgba(6,6,8,0.92)", backdropFilter: "blur(24px)",
              border: "1px solid rgba(202,163,83,0.2)", borderRadius: "5px",
              boxShadow: "0 16px 48px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}>
            <span className="text-[11px] font-black tracking-[0.3em] uppercase" style={{ color: "#CAA353" }}>APEX</span>
            <div className="w-full h-px my-0.5" style={{ background: "rgba(202,163,83,0.14)" }} />
            <span className="text-[9px] font-medium tracking-[0.2em] uppercase" style={{ color: "rgba(255,255,255,0.25)" }}>
              Next Edge Mascot
            </span>
          </div>
          <div className="w-0 h-0 mx-auto"
            style={above
              ? { borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderBottom: "5px solid rgba(202,163,83,0.2)" }
              : { borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "5px solid rgba(202,163,83,0.2)" }
            } />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────
const NAV_SCALE = 0.44;
const LOCK_DURATION = 5000; // 5 seconds

export function EagleMascot() {
  const controls = useAnimation();
  const [mode, setMode] = useState<"patrol" | "locked" | "nav">("patrol");
  const [visual, setVisual] = useState<"soaring" | "banking" | "perched">("soaring");
  const [facingLeft, setFacingLeft] = useState(false);
  const [showApex, setShowApex] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleId = useRef(0);

  const posRef = useRef({ x: window.innerWidth / 2 - 55, y: 100 });
  const [cssPos, setCssPos] = useState({ x: window.innerWidth / 2 - 55, y: 100 });

  const modeRef = useRef<"patrol" | "locked" | "nav">("patrol");
  const lastFullPos = useRef({ x: window.innerWidth / 2 - 55, y: 100 });
  const animating = useRef(false);
  const lockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const patrolTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navLeaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const trailTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Helpers ──
  const clampX = (x: number) => Math.max(10, Math.min(x, window.innerWidth - 120));
  const clampY = (y: number) => Math.max(10, Math.min(y, window.innerHeight - 100));

  const addParticles = useCallback((x: number, y: number) => {
    setParticles((p) => [
      ...p.slice(-18),
      ...Array.from({ length: 3 }, () => ({
        id: particleId.current++,
        x: x + (Math.random() - 0.5) * 22,
        y: y + (Math.random() - 0.5) * 14,
        r: 3 + Math.random() * 5,
      })),
    ]);
  }, []);

  // ── Next patrol waypoint ──
  const getWaypoint = useCallback((): { x: number; y: number } => {
    const vw = window.innerWidth, vh = window.innerHeight;

    // 35% chance: hover near "Start a Project" button
    if (Math.random() < 0.35) {
      const btn = document.querySelector<HTMLElement>('[data-testid="button-nav-cta"]');
      if (btn) {
        const r = btn.getBoundingClientRect();
        return { x: clampX(r.left + r.width / 2 - 55), y: clampY(r.top + r.height / 2 - 42) };
      }
    }

    // Random position, weighted toward content areas
    return {
      x: clampX(Math.random() * (vw - 140) + 20),
      y: clampY(Math.random() * (vh * 0.8) + 60),
    };
  }, []);

  // ── Fly to a position (patrol or directed) ──
  const flyTo = useCallback(
    (destX: number, destY: number, opts: { sound?: boolean; particles?: boolean; speed?: "slow" | "fast" }) => {
      const { sound = false, particles: showTrail = false, speed = "slow" } = opts;

      const dx = destX - posRef.current.x;
      const dy = destY - posRef.current.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 12) return Promise.resolve();

      setFacingLeft(dx < -20);
      setVisual("banking");
      if (sound) playEagleCry();

      const arcLift = speed === "fast" ? Math.min(dist * 0.3, 170) : Math.min(dist * 0.18, 80);
      const midX = (posRef.current.x + destX) / 2;
      const midY = Math.min(posRef.current.y, destY) - arcLift;
      const bank = Math.max(-22, Math.min(22, dx * 0.04));
      const dur = speed === "fast"
        ? Math.max(0.45, Math.min(0.5 + dist / 2200, 1.1))
        : Math.max(1.5, Math.min(2 + dist / 900, 4));

      if (showTrail && speed === "fast") {
        let t = 0;
        if (trailTimer.current) clearInterval(trailTimer.current);
        trailTimer.current = setInterval(() => {
          t += 85;
          const pct = Math.min(t / (dur * 1000), 1);
          const px = (1 - pct) ** 2 * posRef.current.x + 2 * (1 - pct) * pct * midX + pct ** 2 * destX;
          const py = (1 - pct) ** 2 * posRef.current.y + 2 * (1 - pct) * pct * midY + pct ** 2 * destY;
          addParticles(px + 55, py + 40);
          if (t >= dur * 1000) clearInterval(trailTimer.current!);
        }, 85);
      }

      return controls.start({
        x: [posRef.current.x, midX, destX],
        y: [posRef.current.y, midY, destY],
        rotate: [0, bank, 0],
        scale: [1, speed === "fast" ? 1.06 : 1, 1],
        transition: { duration: dur, ease: [0.25, 0.46, 0.45, 0.94], times: [0, 0.45, 1] },
      }).then(() => {
        posRef.current = { x: destX, y: destY };
        setCssPos({ x: destX, y: destY });
      });
    },
    [controls, addParticles]
  );

  // ── Patrol loop ──
  const runPatrol = useCallback(() => {
    if (modeRef.current !== "patrol") return;

    const wp = getWaypoint();

    flyTo(wp.x, wp.y, { sound: false, particles: false, speed: "slow" }).then(() => {
      if (modeRef.current !== "patrol") return;
      setVisual("soaring");

      const waitMs = 800 + Math.random() * 1400;
      patrolTimer.current = setTimeout(() => {
        if (modeRef.current === "patrol") runPatrol();
      }, waitMs);
    });
  }, [flyTo, getWaypoint]);

  // ── Start patrol ──
  const startPatrol = useCallback(() => {
    if (lockTimer.current) clearTimeout(lockTimer.current);
    if (patrolTimer.current) clearTimeout(patrolTimer.current);
    modeRef.current = "patrol";
    setMode("patrol");
    setVisual("soaring");
    animating.current = false;
    runPatrol();
  }, [runPatrol]);

  // Boot
  useEffect(() => {
    const t = setTimeout(startPatrol, 400);
    return () => clearTimeout(t);
  }, [startPatrol]);

  // ── Click → locked ──
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (modeRef.current === "nav") return;

      const destX = clampX(e.clientX - 54);
      const destY = clampY(e.clientY - 42);

      // Clear existing patrol
      if (patrolTimer.current) clearTimeout(patrolTimer.current);
      if (lockTimer.current) clearTimeout(lockTimer.current);
      modeRef.current = "locked";
      setMode("locked");
      animating.current = true;

      flyTo(destX, destY, { sound: true, particles: true, speed: "fast" }).then(() => {
        // Land
        setVisual("perched");
        controls.start({
          y: [destY, destY - 12, destY + 4, destY - 2, destY],
          transition: { duration: 0.42, ease: "easeOut" },
        }).then(() => {
          animating.current = false;
          // Wait 5 seconds then resume patrol
          lockTimer.current = setTimeout(() => {
            if (modeRef.current === "locked") startPatrol();
          }, LOCK_DURATION);
        });
      });
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      if (lockTimer.current) clearTimeout(lockTimer.current);
      if (patrolTimer.current) clearTimeout(patrolTimer.current);
      if (trailTimer.current) clearInterval(trailTimer.current);
    };
  }, [controls, flyTo, startPatrol]);

  // ── Nav hover ──
  useEffect(() => {
    const EAGLE_W = 108 * NAV_SCALE;
    const EAGLE_H = 58 * NAV_SCALE;

    const glideToLink = (el: HTMLElement) => {
      if (patrolTimer.current) clearTimeout(patrolTimer.current);
      if (navLeaveTimer.current) clearTimeout(navLeaveTimer.current);
      if (modeRef.current !== "nav") {
        lastFullPos.current = { ...posRef.current };
        modeRef.current = "nav";
        setMode("nav");
      }

      const rect = el.getBoundingClientRect();
      const dx = rect.left + rect.width / 2 - EAGLE_W / 2 - posRef.current.x;
      setFacingLeft(dx < -10);
      setVisual("soaring");

      const nx = rect.left + rect.width / 2 - EAGLE_W / 2;
      const ny = rect.top + rect.height / 2 - EAGLE_H / 2 - 5;

      controls.start({
        x: nx, y: ny, scale: NAV_SCALE, rotate: 0,
        transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
      }).then(() => { posRef.current = { x: nx, y: ny }; setCssPos({ x: nx, y: ny }); });
    };

    const onNavLeave = () => {
      if (modeRef.current !== "nav") return;
      navLeaveTimer.current = setTimeout(() => {
        modeRef.current = "patrol";
        const dest = lastFullPos.current;
        controls.start({
          x: dest.x, y: dest.y, scale: 1, rotate: 0,
          transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
        }).then(() => {
          posRef.current = dest; setCssPos(dest);
          setMode("patrol");
          runPatrol();
        });
      }, 100);
    };

    const attach = () => {
      document.querySelectorAll<HTMLElement>("[data-nav-item]").forEach((el) =>
        el.addEventListener("mouseenter", () => glideToLink(el))
      );
      document.querySelector<HTMLElement>("[data-nav-container]")?.addEventListener("mouseleave", onNavLeave);
    };
    const t = setTimeout(attach, 600);
    return () => { clearTimeout(t); if (navLeaveTimer.current) clearTimeout(navLeaveTimer.current); };
  }, [controls, runPatrol]);

  // ── Proximity → APEX label ──
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (modeRef.current === "nav") return setShowApex(false);
      const cx = posRef.current.x + (visual === "perched" ? 36 : 55);
      const cy = posRef.current.y + (visual === "perched" ? 45 : 30);
      setShowApex(Math.hypot(e.clientX - cx, e.clientY - cy) < 72);
    };
    document.addEventListener("mousemove", onMove);
    return () => document.removeEventListener("mousemove", onMove);
  }, [visual]);

  const apexAbove = cssPos.y > 100;

  return (
    <>
      <Particles list={particles} />

      <motion.div
        className="fixed z-[9998] pointer-events-none select-none"
        style={{ left: 0, top: 0, x: cssPos.x, y: cssPos.y }}
        animate={controls}
      >
        {/* Ground glow */}
        <div style={{
          position: "absolute", bottom: -6, left: "50%", transform: "translateX(-50%)",
          width: visual === "perched" ? 40 : 80, height: visual === "perched" ? 16 : 22,
          background: "radial-gradient(ellipse, rgba(202,163,83,0.1) 0%, transparent 70%)",
          filter: "blur(8px)", transition: "all 0.5s ease", pointerEvents: "none",
        }} />

        {/* Countdown ring when locked */}
        {mode === "locked" && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 56, height: 56 }}
          >
            <svg width="56" height="56" viewBox="0 0 56 56" style={{ position: "absolute", top: -6, left: -6 }}>
              <motion.circle cx="28" cy="28" r="24" fill="none" stroke="rgba(202,163,83,0.25)"
                strokeWidth="1.5" strokeDasharray="150" strokeDashoffset="0"
                animate={{ strokeDashoffset: 150 }}
                transition={{ duration: LOCK_DURATION / 1000, ease: "linear" }} />
            </svg>
          </motion.div>
        )}

        {/* APEX tooltip */}
        <ApexTooltip visible={showApex && !animating.current} above={apexAbove} />

        {/* Eagle */}
        <motion.div
          animate={visual === "soaring" ? { y: [0, -6, 0] } : {}}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          {visual === "perched" && <PerchedEagle />}
          {visual === "banking" && <BankingEagle facingLeft={facingLeft} />}
          {visual === "soaring" && <SoaringEagle />}
        </motion.div>
      </motion.div>
    </>
  );
}
