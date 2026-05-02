import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Pose = "sitting" | "falling" | "climbing" | "resting";

function PandaSVG({ pose }: { pose: Pose }) {
  if (pose === "resting") {
    return (
      <svg width="72" height="52" viewBox="0 0 72 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* body lying sideways */}
        <ellipse cx="34" cy="38" rx="24" ry="12" fill="#f2f2f0" />
        {/* head */}
        <circle cx="60" cy="28" r="16" fill="#f2f2f0" />
        {/* ears */}
        <circle cx="50" cy="14" r="7" fill="#1c1c1c" />
        <circle cx="66" cy="13" r="7" fill="#1c1c1c" />
        <circle cx="50" cy="14" r="3.5" fill="#3a2020" />
        <circle cx="66" cy="13" r="3.5" fill="#3a2020" />
        {/* eye patches */}
        <ellipse cx="55" cy="27" rx="5.5" ry="5" fill="#1c1c1c" />
        <ellipse cx="65" cy="27" rx="5.5" ry="5" fill="#1c1c1c" />
        {/* sleeping eyes - happy arcs */}
        <path d="M52.5 27.5 Q55 25 57.5 27.5" stroke="#f2f2f0" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path d="M62.5 27.5 Q65 25 67.5 27.5" stroke="#f2f2f0" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        {/* nose */}
        <ellipse cx="60" cy="32" rx="2.2" ry="1.6" fill="#1c1c1c" />
        {/* little smile */}
        <path d="M57.5 34.5 Q60 37 62.5 34.5" stroke="#1c1c1c" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        {/* tail / legs */}
        <ellipse cx="11" cy="30" rx="9" ry="6" fill="#1c1c1c" transform="rotate(-15 11 30)" />
        <ellipse cx="11" cy="44" rx="9" ry="6" fill="#1c1c1c" transform="rotate(15 11 44)" />
        {/* arm peeking */}
        <ellipse cx="36" cy="26" rx="5" ry="8" fill="#1c1c1c" transform="rotate(-20 36 26)" />
        {/* zzz */}
        <text x="28" y="16" fontSize="9" fill="#1c1c1c" opacity="0.55" fontWeight="700" fontFamily="sans-serif">z</text>
        <text x="36" y="9" fontSize="11" fill="#1c1c1c" opacity="0.35" fontWeight="700" fontFamily="sans-serif">z</text>
        <text x="46" y="4" fontSize="13" fill="#1c1c1c" opacity="0.2" fontWeight="700" fontFamily="sans-serif">z</text>
      </svg>
    );
  }

  if (pose === "falling") {
    return (
      <motion.svg
        width="54" height="74" viewBox="0 0 54 74" fill="none"
        animate={{ rotate: [-4, 4, -4] }}
        transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* arms FLUNG UP */}
        <ellipse cx="8" cy="34" rx="5.5" ry="10" fill="#1c1c1c" transform="rotate(-40 8 34)" />
        <ellipse cx="46" cy="34" rx="5.5" ry="10" fill="#1c1c1c" transform="rotate(40 46 34)" />
        {/* body */}
        <ellipse cx="27" cy="54" rx="17" ry="15" fill="#f2f2f0" />
        {/* legs dangling */}
        <ellipse cx="19" cy="68" rx="7" ry="6" fill="#1c1c1c" transform="rotate(15 19 68)" />
        <ellipse cx="35" cy="68" rx="7" ry="6" fill="#1c1c1c" transform="rotate(-15 35 68)" />
        {/* head */}
        <circle cx="27" cy="22" r="17" fill="#f2f2f0" />
        {/* ears */}
        <circle cx="13" cy="9" r="7.5" fill="#1c1c1c" />
        <circle cx="41" cy="9" r="7.5" fill="#1c1c1c" />
        <circle cx="13" cy="9" r="3.8" fill="#3a2020" />
        <circle cx="41" cy="9" r="3.8" fill="#3a2020" />
        {/* wide eye patches */}
        <ellipse cx="20" cy="21" rx="6.5" ry="6" fill="#1c1c1c" />
        <ellipse cx="34" cy="21" rx="6.5" ry="6" fill="#1c1c1c" />
        {/* huge surprised eyes */}
        <circle cx="20" cy="22" r="3.8" fill="white" />
        <circle cx="34" cy="22" r="3.8" fill="white" />
        <circle cx="20.5" cy="23" r="2" fill="#1c1c1c" />
        <circle cx="34.5" cy="23" r="2" fill="#1c1c1c" />
        {/* tiny shine dots */}
        <circle cx="19" cy="21.5" r="0.8" fill="white" />
        <circle cx="33" cy="21.5" r="0.8" fill="white" />
        {/* O mouth - surprised */}
        <ellipse cx="27" cy="31" rx="3.2" ry="3" fill="#1c1c1c" />
        <ellipse cx="27" cy="31.5" rx="1.8" ry="1.8" fill="#cc4444" />
        {/* sweat drops */}
        <ellipse cx="5" cy="22" rx="2" ry="3.5" fill="#aad4f5" opacity="0.85" />
        <ellipse cx="49" cy="22" rx="2" ry="3.5" fill="#aad4f5" opacity="0.85" />
      </motion.svg>
    );
  }

  if (pose === "climbing") {
    return (
      <motion.svg
        width="54" height="72" viewBox="0 0 54 72" fill="none"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* arms reaching UP and OUT - gripping */}
        <ellipse cx="7" cy="24" rx="5" ry="11" fill="#1c1c1c" transform="rotate(-25 7 24)" />
        <ellipse cx="47" cy="22" rx="5" ry="11" fill="#1c1c1c" transform="rotate(25 47 22)" />
        {/* little gripping claws */}
        <circle cx="4" cy="14" r="4" fill="#1c1c1c" />
        <circle cx="50" cy="12" r="4" fill="#1c1c1c" />
        {/* body - tilted forward with effort */}
        <ellipse cx="27" cy="54" rx="15" ry="13" fill="#f2f2f0" transform="rotate(-5 27 54)" />
        {/* legs gripping/pushing */}
        <ellipse cx="18" cy="67" rx="7" ry="6" fill="#1c1c1c" transform="rotate(20 18 67)" />
        <ellipse cx="36" cy="65" rx="7" ry="6" fill="#1c1c1c" transform="rotate(-20 36 65)" />
        {/* head */}
        <circle cx="27" cy="22" r="16" fill="#f2f2f0" />
        {/* ears */}
        <circle cx="14" cy="9" r="7" fill="#1c1c1c" />
        <circle cx="40" cy="9" r="7" fill="#1c1c1c" />
        <circle cx="14" cy="9" r="3.5" fill="#3a2020" />
        <circle cx="40" cy="9" r="3.5" fill="#3a2020" />
        {/* eye patches - determined squint */}
        <ellipse cx="20" cy="21" rx="6" ry="4.5" fill="#1c1c1c" />
        <ellipse cx="34" cy="21" rx="6" ry="4.5" fill="#1c1c1c" />
        {/* squinting determined eyes */}
        <path d="M17 21.5 Q20 19 23 21.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <path d="M31 21.5 Q34 19 37 21.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        {/* effort mouth - slightly open panting */}
        <path d="M22.5 28 Q27 31.5 31.5 28" stroke="#1c1c1c" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <ellipse cx="27" cy="29.5" rx="2.5" ry="2" fill="#cc6666" opacity="0.7" />
        {/* exertion sweat */}
        <ellipse cx="6" cy="16" rx="1.8" ry="3" fill="#aad4f5" opacity="0.8" />
        <ellipse cx="48" cy="14" rx="1.8" ry="3" fill="#aad4f5" opacity="0.8" />
        {/* effort lines */}
        <path d="M3 20 L6 18" stroke="#1c1c1c" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
        <path d="M51 18 L48 16" stroke="#1c1c1c" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
      </motion.svg>
    );
  }

  // sitting — default idle pose
  return (
    <motion.svg
      width="52" height="66" viewBox="0 0 52 66" fill="none"
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* body */}
      <ellipse cx="26" cy="48" rx="18" ry="16" fill="#f2f2f0" />
      {/* arm left - resting */}
      <ellipse cx="8" cy="50" rx="5" ry="9" fill="#1c1c1c" transform="rotate(12 8 50)" />
      {/* arm right - slightly raised / waving */}
      <ellipse cx="44" cy="44" rx="5" ry="9" fill="#1c1c1c" transform="rotate(-28 44 44)" />
      {/* little waving hand */}
      <circle cx="47" cy="36" r="4.5" fill="#1c1c1c" />
      {/* legs */}
      <ellipse cx="17" cy="61" rx="8" ry="5.5" fill="#1c1c1c" />
      <ellipse cx="35" cy="61" rx="8" ry="5.5" fill="#1c1c1c" />
      {/* head */}
      <circle cx="26" cy="22" r="18" fill="#f2f2f0" />
      {/* ears */}
      <circle cx="11" cy="8" r="8" fill="#1c1c1c" />
      <circle cx="41" cy="8" r="8" fill="#1c1c1c" />
      <circle cx="11" cy="8" r="4" fill="#3a2020" />
      <circle cx="41" cy="8" r="4" fill="#3a2020" />
      {/* eye patches */}
      <ellipse cx="19" cy="21" rx="6.5" ry="6" fill="#1c1c1c" />
      <ellipse cx="33" cy="21" rx="6.5" ry="6" fill="#1c1c1c" />
      {/* happy eyes */}
      <circle cx="19" cy="22" r="3" fill="white" />
      <circle cx="33" cy="22" r="3" fill="white" />
      <circle cx="19.5" cy="23" r="1.8" fill="#1c1c1c" />
      <circle cx="33.5" cy="23" r="1.8" fill="#1c1c1c" />
      {/* shine dots */}
      <circle cx="18.2" cy="21.5" r="0.7" fill="white" />
      <circle cx="32.2" cy="21.5" r="0.7" fill="white" />
      {/* nose */}
      <ellipse cx="26" cy="28" rx="2.8" ry="2" fill="#1c1c1c" />
      {/* happy smile */}
      <path d="M21 32 Q26 36.5 31 32" stroke="#1c1c1c" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      {/* rosy cheeks */}
      <ellipse cx="14" cy="27" rx="4" ry="2.5" fill="#ffb3b3" opacity="0.35" />
      <ellipse cx="38" cy="27" rx="4" ry="2.5" fill="#ffb3b3" opacity="0.35" />
    </motion.svg>
  );
}

export function FloatingPanda() {
  const [pose, setPose] = useState<Pose>("sitting");

  const targetX = useMotionValue(-200);
  const targetY = useMotionValue(300);

  const springX = useSpring(targetX, { stiffness: 70, damping: 22 });
  const springY = useSpring(targetY, { stiffness: 55, damping: 18 });

  const pandaDocY    = useRef(500);
  const lastScrollY  = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const isAtContact  = useRef(false);
  const scrollTimer  = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Key anchors in document space
  const heroBtnDocY  = useRef(300);
  const heroBtnDocX  = useRef(400);
  const contactDocY  = useRef(999999);
  const contactDocX  = useRef(300);
  const pandaW       = 54; // approx panda width

  useEffect(() => {
    const measure = () => {
      const heroBtn     = document.querySelector('[data-testid="button-hero-primary"]') as HTMLElement | null;
      const whatsappBtn = document.querySelector('[data-testid="button-contact-whatsapp"]') as HTMLElement | null;

      if (heroBtn) {
        const r = heroBtn.getBoundingClientRect();
        heroBtnDocY.current = r.top  + window.scrollY - 60; // sit just above button
        heroBtnDocX.current = r.left + r.width / 2 - pandaW / 2;
      }

      if (whatsappBtn) {
        const r = whatsappBtn.getBoundingClientRect();
        contactDocY.current = r.top  + window.scrollY - 22;
        contactDocX.current = r.left + r.width / 2 - 36;
      }
    };

    // Initial measurement — wait for entrance animations
    const t1 = setTimeout(measure, 900);
    const t2 = setTimeout(measure, 2000); // re-measure after lenis settles

    window.addEventListener("resize", measure);

    // Initialise at hero button
    const initPanda = () => {
      const heroBtn = document.querySelector('[data-testid="button-hero-primary"]') as HTMLElement | null;
      if (heroBtn) {
        const r = heroBtn.getBoundingClientRect();
        pandaDocY.current = heroBtnDocY.current;
        targetY.set(r.top - 60);
        targetX.set(r.left + r.width / 2 - pandaW / 2);
      }
    };
    setTimeout(initPanda, 950);

    const onScroll = () => {
      const curr  = window.scrollY;
      const delta = curr - lastScrollY.current;
      const vh    = window.innerHeight;

      if (Math.abs(delta) < 0.5) { lastScrollY.current = curr; return; }

      // ── AT TOP ──────────────────────────────────────────────────────────────
      if (curr < 280) {
        isAtContact.current = false;
        pandaDocY.current   = heroBtnDocY.current;
        setPose("sitting");
        clearTimeout(scrollTimer.current);
        targetY.set(Math.max(50, heroBtnDocY.current - curr));
        targetX.set(heroBtnDocX.current);
        lastScrollY.current = curr;
        return;
      }

      // ── SCROLLING DOWN ───────────────────────────────────────────────────────
      if (delta > 0) {
        if (isAtContact.current) {
          // Panda rests — only update its visual screen position (it anchors to button)
          const sy = contactDocY.current - curr;
          targetY.set(Math.max(50, Math.min(vh - 50, sy)));
          targetX.set(contactDocX.current);
          lastScrollY.current = curr;
          return;
        }

        // Fall: panda's doc position moves 1.22× faster than scroll → appears to drop on-screen
        pandaDocY.current += delta * 1.22;

        if (pandaDocY.current >= contactDocY.current) {
          pandaDocY.current   = contactDocY.current;
          isAtContact.current = true;
          setPose("resting");
          clearTimeout(scrollTimer.current);
          const sy = contactDocY.current - curr;
          targetY.set(Math.max(50, Math.min(vh - 50, sy)));
          targetX.set(contactDocX.current);
        } else {
          setPose("falling");
          const sy = pandaDocY.current - curr;
          targetY.set(Math.max(50, Math.min(vh - 50, sy)));
          targetX.set(window.innerWidth * 0.66);

          clearTimeout(scrollTimer.current);
          scrollTimer.current = setTimeout(() => setPose("sitting"), 450);
        }
      }

      // ── SCROLLING UP ─────────────────────────────────────────────────────────
      else {
        if (isAtContact.current) isAtContact.current = false;

        // Climb: panda's doc position moves only 0.28× of scroll speed → struggles
        pandaDocY.current += delta * 0.28;
        pandaDocY.current  = Math.max(heroBtnDocY.current, pandaDocY.current);

        setPose("climbing");
        const sy = pandaDocY.current - curr;
        targetY.set(Math.max(50, Math.min(vh - 50, sy)));
        targetX.set(window.innerWidth * 0.66);

        clearTimeout(scrollTimer.current);
        scrollTimer.current = setTimeout(() => setPose("sitting"), 500);
      }

      lastScrollY.current = curr;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(scrollTimer.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, [targetX, targetY]);

  return (
    <motion.div
      className="fixed left-0 top-0 z-[9990] pointer-events-none select-none"
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* subtle drop shadow so panda reads against any bg */}
      <div style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.45))" }}>
        <PandaSVG pose={pose} />
      </div>

      {/* pose label for delight – fades in/out */}
      <motion.div
        key={pose}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 0.55, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-bold tracking-[0.18em] uppercase"
        style={{ color: "#CAA353" }}
      >
        {pose === "sitting"  && "· · ·"}
        {pose === "falling"  && "AHHH!"}
        {pose === "climbing" && "UGH.."}
        {pose === "resting"  && "zzz"}
      </motion.div>
    </motion.div>
  );
}
