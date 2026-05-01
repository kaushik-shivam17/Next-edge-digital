import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springX = useSpring(cursorX, { stiffness: 800, damping: 40, mass: 0.2 });
  const springY = useSpring(cursorY, { stiffness: 800, damping: 40, mass: 0.2 });

  const ringX = useSpring(cursorX, { stiffness: 120, damping: 22, mass: 0.8 });
  const ringY = useSpring(cursorY, { stiffness: 120, damping: 22, mass: 0.8 });

  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(false);

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

    const interactables = document.querySelectorAll("a, button, [data-cursor-hover]");
    const onHoverIn = () => setHovering(true);
    const onHoverOut = () => setHovering(false);
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", onHoverIn);
      el.addEventListener("mouseleave", onHoverOut);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", onHoverIn);
        el.removeEventListener("mouseleave", onHoverOut);
      });
    };
  }, []);

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
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
            width: hovering ? 48 : clicking ? 20 : 36,
            height: hovering ? 48 : clicking ? 20 : 36,
            opacity: hovering ? 0.6 : 0.35,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{
            borderRadius: "50%",
            border: "1.5px solid rgba(202,163,83,0.8)",
            boxShadow: hovering ? "0 0 12px rgba(202,163,83,0.4)" : "none",
          }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: hidden ? 0 : 1,
        }}
      >
        <motion.div
          animate={{
            width: clicking ? 6 : hovering ? 8 : 5,
            height: clicking ? 6 : hovering ? 8 : 5,
            backgroundColor: hovering ? "rgba(202,163,83,1)" : "rgba(202,163,83,0.9)",
            boxShadow: hovering
              ? "0 0 10px rgba(202,163,83,0.8), 0 0 20px rgba(202,163,83,0.4)"
              : "0 0 6px rgba(202,163,83,0.5)",
          }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          style={{ borderRadius: "50%" }}
        />
      </motion.div>
    </>
  );
}
