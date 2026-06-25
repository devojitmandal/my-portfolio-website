"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import Link from "next/link";

export function RoboNav() {
  const [isHovered, setIsHovered] = useState(false);
  const [isSmiling, setIsSmiling] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const petControls = useAnimation();

  // 1. MOUSE TRACKING LOGIC
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates from -1 (left/top) to 1 (right/bottom)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

// 2. ORGANIC DANCE LOGIC
useEffect(() => {
    let timeout: NodeJS.Timeout;

    const dance = async () => {
      // Only dance if not hovered
      if (!isHovered) {
        await petControls.start({
          y: [0, -15, 0],
          rotate: [0, -15, 15, -15, 0],
          transition: { duration: 1.2, ease: "easeInOut" } // Slower, softer movement
        });
      }
      
      // Schedule the next dance at a random time between 7 and 15 seconds
      const nextDance = Math.random() * 8000 + 7000;
      timeout = setTimeout(dance, nextDance);
    };

    // Start the recursive loop
    timeout = setTimeout(dance, 5000); 

    return () => clearTimeout(timeout);
  }, [isHovered, petControls]);

  // Calculate eye offsets (max 6px movement in any direction)
  const eyeOffsetX = mousePos.x * 6;
  const eyeOffsetY = mousePos.y * 6;

  const links = [
    { name: "work", href: "#work" },
    { name: "about", href: "#about" },
    { name: "contact", href: "#contact" },
  ];

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex justify-center">
      <motion.nav
        className="flex items-center bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.8)] overflow-hidden cursor-pointer"
        initial={{ borderRadius: 999, height: 64, width: 64 }}
        animate={{
          width: isHovered ? 340 : 64,
          borderRadius: 999,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsSmiling(!isSmiling)} // Click to toggle smile!
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        {/* LEFT COMPONENT: THE ROBO-PET */}
        <motion.div 
          animate={petControls}
          className="w-[64px] h-[64px] shrink-0 flex items-center justify-center relative z-10"
        >
          {/* SVG inspired by the reference image */}
          <svg width="44" height="44" viewBox="0 0 100 100" className="drop-shadow-lg">
            {/* Mechanical Ears (drawn first so they sit behind the head) */}
            <path d="M 25 30 L 15 5 L 45 15 Z" fill="#94a3b8" />
            <path d="M 75 30 L 85 5 L 55 15 Z" fill="#94a3b8" />
            
            {/* Outer Helmet */}
            <circle cx="50" cy="55" r="42" fill="#cbd5e1" />
            
            {/* Glass Face Screen */}
            <circle cx="50" cy="55" r="32" fill="#0f172a" stroke="#334155" strokeWidth="2" />

            {/* Glowing Eyes */}
            {isSmiling ? (
              // Happy / Smiling Eyes ^ ^
              <g stroke="#22d3ee" strokeWidth="6" strokeLinecap="round" fill="none">
                <path d={`M ${30 + eyeOffsetX} ${55 + eyeOffsetY} Q ${38 + eyeOffsetX} ${45 + eyeOffsetY} ${46 + eyeOffsetX} ${55 + eyeOffsetY}`} />
                <path d={`M ${54 + eyeOffsetX} ${55 + eyeOffsetY} Q ${62 + eyeOffsetX} ${45 + eyeOffsetY} ${70 + eyeOffsetX} ${55 + eyeOffsetY}`} />
              </g>
            ) : (
              // Idle / Looking Slanted Eyes
              <g fill="#22d3ee">
                <rect 
                  x={32 + eyeOffsetX} y={45 + eyeOffsetY} width="10" height="18" rx="3" 
                  transform={`rotate(-15 ${37 + eyeOffsetX} ${54 + eyeOffsetY})`} 
                />
                <rect 
                  x={58 + eyeOffsetX} y={45 + eyeOffsetY} width="10" height="18" rx="3" 
                  transform={`rotate(15 ${63 + eyeOffsetX} ${54 + eyeOffsetY})`} 
                />
              </g>
            )}

            {/* Little Orange Vents/Cheeks */}
            <circle cx="30" cy="80" r="8" fill="#ea580c" />
            <circle cx="70" cy="80" r="8" fill="#ea580c" />
          </svg>
        </motion.div>

        {/* RIGHT COMPONENT: THE LINKS */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex items-center gap-8 pl-2 pr-8 whitespace-nowrap"
            >
              {links.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href}
                  className="font-mono text-[12px] text-white/50 hover:text-teal-400 transition-colors uppercase tracking-[0.2em] font-bold"
                >
                  {link.name}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}