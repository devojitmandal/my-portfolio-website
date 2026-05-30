"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorSpotlight() {
  const [hasMoved, setHasMoved] = useState(false);
  const hasMovedRef = useRef(false);

  // Raw, instant mouse position
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const mainX = useSpring(mouseX, { damping: 28, stiffness: 420, mass: 0.45 });
  const mainY = useSpring(mouseY, { damping: 28, stiffness: 420, mass: 0.45 });

  const trail1X = useSpring(mouseX, { damping: 32, stiffness: 190, mass: 0.85 });
  const trail1Y = useSpring(mouseY, { damping: 32, stiffness: 190, mass: 0.85 });

  const trail2X = useSpring(mouseX, { damping: 42, stiffness: 110, mass: 1.3 });
  const trail2Y = useSpring(mouseY, { damping: 42, stiffness: 110, mass: 1.3 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!hasMovedRef.current) {
        mainX.jump(e.clientX);
        mainY.jump(e.clientY);
        trail1X.jump(e.clientX);
        trail1Y.jump(e.clientY);
        trail2X.jump(e.clientX);
        trail2Y.jump(e.clientY);
        hasMovedRef.current = true;
        setHasMoved(true);
      }
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bloom = (delay: number) => ({
    scale: hasMoved ? 1 : 0,
    opacity: hasMoved ? 1 : 0,
    transition: { delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <div className="pointer-events-none fixed inset-0 z-[999999] overflow-hidden">

      {/* Ambient glow - Uses mainX/Y so the massive light drags smoothly */}
      <motion.div
        animate={bloom(0)}
        className="absolute left-0 top-0 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          x: mainX,
          y: mainY,
          background: "radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Core glow — LOCKED TO mouseX/Y (Zero lag) */}
      <motion.div
        animate={bloom(0.028)}
        className="absolute left-0 top-0 h-[90px] w-[90px] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen"
        style={{
          x: mouseX, 
          y: mouseY,
          background: "radial-gradient(circle, rgba(34,211,238,0.22) 0%, rgba(6,182,212,0.06) 60%, transparent 100%)",
          filter: "blur(18px)",
        }}
      />

      {/* Trail 1 — violet */}
      <motion.div
        animate={bloom(0.056)}
        className="absolute left-0 top-0 h-[52px] w-[52px] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen"
        style={{
          x: trail1X,
          y: trail1Y,
          background: "radial-gradient(circle, rgba(139,92,246,0.35) 0%, rgba(109,40,217,0.08) 70%, transparent 100%)",
          filter: "blur(12px)",
        }}
      />

      {/* Trail 2 — indigo */}
      <motion.div
        animate={bloom(0.084)}
        className="absolute left-0 top-0 h-[28px] w-[28px] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen"
        style={{
          x: trail2X,
          y: trail2Y,
          background: "radial-gradient(circle, rgba(99,102,241,0.45) 0%, rgba(67,56,202,0.1) 70%, transparent 100%)",
          filter: "blur(7px)",
        }}
      />

      {/* Subtle ring — LOCKED TO mouseX/Y (Zero lag) */}
      <motion.div
        animate={bloom(0.042)}
        className="absolute left-0 top-0 h-[52px] w-[52px] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-overlay"
        style={{
          x: mouseX,
          y: mouseY,
          border: "1px solid rgba(255,255,255,0.06)",
          background: "transparent",
        }}
      />

      {/* Precision dot — snaps to true cursor */}
      <motion.div
        animate={bloom(0)}
        className="absolute left-0 top-0 h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen"
        style={{
          x: mouseX,
          y: mouseY,
          background: "rgba(224,242,254,0.9)",
          boxShadow: "0 0 6px rgba(34,211,238,0.8), 0 0 12px rgba(34,211,238,0.4)",
        }}
      />
    </div>
  );
}