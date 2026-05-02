import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

export function CustomCursor() {
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);

  const springX = useSpring(cursorX, { stiffness: 900, damping: 42, mass: 0.15 });
  const springY = useSpring(cursorY, { stiffness: 900, damping: 42, mass: 0.15 });

  const ringX = useSpring(cursorX, { stiffness: 110, damping: 20, mass: 0.9 });
  const ringY = useSpring(cursorY, { stiffness: 110, damping: 20, mass: 0.9 });

  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    const attachListeners = () => {
      const els = document.querySelectorAll<HTMLElement>(
        "a, button, [data-cursor-hover], [data-cursor-text]"
      );
      const cleanups: Array<() => void> = [];

      els.forEach((el) => {
        const text = el.getAttribute("data-cursor-text") ?? "";
        const onIn = () => { setHovering(true); setCursorText(text); };
        const onOut = () => { setHovering(false); setCursorText(""); };
        el.addEventListener("mouseenter", onIn);
        el.addEventListener("mouseleave", onOut);
        cleanups.push(() => {
          el.removeEventListener("mouseenter", onIn);
          el.removeEventListener("mouseleave", onOut);
        });
      });

      return () => cleanups.forEach((fn) => fn());
    };

    let detach = attachListeners();
    const t1 = setTimeout(() => { detach(); detach = attachListeners(); }, 1800);
    const t2 = setTimeout(() => { detach(); detach = attachListeners(); }, 4000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      detach();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  const hasText = Boolean(cursorText);
  const ringSize = hasText ? 90 : hovering ? 52 : clicking ? 18 : 34;

  return (
    <>
      {/* Trailing ring — expands and shows label text on certain hovers */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: hidden ? 0 : 1,
        }}
      >
        <motion.div
          animate={{
            width: ringSize,
            height: ringSize,
            opacity: hovering ? 1 : 0.38,
            backgroundColor: hasText ? "rgba(202,163,83,0.08)" : "transparent",
          }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center"
          style={{
            borderRadius: "50%",
            border: hasText
              ? "1px solid rgba(202,163,83,0.45)"
              : "1.5px solid rgba(202,163,83,0.75)",
            boxShadow: hovering
              ? "0 0 28px rgba(202,163,83,0.12), inset 0 0 12px rgba(202,163,83,0.05)"
              : "none",
            backdropFilter: hasText ? "blur(8px)" : "none",
          }}
        >
          <AnimatePresence mode="wait">
            {hasText && (
              <motion.span
                key={cursorText}
                initial={{ opacity: 0, scale: 0.65, letterSpacing: "0.1em" }}
                animate={{ opacity: 1, scale: 1, letterSpacing: "0.28em" }}
                exit={{ opacity: 0, scale: 0.65 }}
                transition={{ duration: 0.14, ease: "easeOut" }}
                className="text-[9px] font-black uppercase select-none"
                style={{ color: "#CAA353" }}
              >
                {cursorText}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Precise dot — disappears when ring shows label */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: hidden || hasText ? 0 : 1,
        }}
      >
        <motion.div
          animate={{
            width: clicking ? 4 : hovering ? 7 : 5,
            height: clicking ? 4 : hovering ? 7 : 5,
            backgroundColor: "rgba(202,163,83,1)",
            boxShadow: hovering
              ? "0 0 14px rgba(202,163,83,0.9), 0 0 28px rgba(202,163,83,0.35)"
              : "0 0 7px rgba(202,163,83,0.55)",
          }}
          transition={{ duration: 0.14, ease: "easeOut" }}
          style={{ borderRadius: "50%" }}
        />
      </motion.div>
    </>
  );
}
