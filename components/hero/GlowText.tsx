"use client";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { useEffect, useRef } from "react";

interface GlowTextProps {
  children: React.ReactNode;
  className?: string;
  isGradient?: boolean;
  highlightColor?: string;
  radius?: number;
  style?: React.CSSProperties;
}

export function GlowText({
  children,
  className = "",
  isGradient = false,
  highlightColor = "oklch(0.60 0.22 200 / 0.15)",
  radius = 200,
  style = {},
}: GlowTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []); // Empty dependency array fixed here

  const smoothX = useSpring(mouseX, { damping: 40, stiffness: 400 });
  const smoothY = useSpring(mouseY, { damping: 40, stiffness: 400 });

  const maskImage = useMotionTemplate`radial-gradient(${radius}px circle at ${smoothX}px ${smoothY}px, black 0%, transparent 100%)`;

  return (
    <span ref={containerRef} className={`relative inline-block ${className}`} style={style}>
      {children}
      {isGradient && (
        <motion.span
          className="absolute inset-0 z-10 pointer-events-none mix-blend-screen"
          style={{
            background: highlightColor,
            WebkitMaskImage: maskImage,
            maskImage: maskImage,
          }}
        />
      )}
    </span>
  );
}