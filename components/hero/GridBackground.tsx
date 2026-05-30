"use client";

import { motion } from "framer-motion";

export function GridBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-40">
      
      {/* 1. FIXED MASK: Moved back to style tag for strict cross-browser (Webkit) support */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 100%)',
        }}
      >
        
        {/* 2. RESTORED GRID: The actual graph-paper lines behind the circuit */}
        <div 
          className="absolute inset-0 w-full h-full opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(20, 184, 166, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(20, 184, 166, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* 3. FIXED ASPECT RATIO: 'xMidYMid slice' ensures the ESP32 stays a perfect square */}
        <svg 
          className="absolute inset-0 w-full h-full" 
          viewBox="0 0 1920 1080" 
          preserveAspectRatio="xMidYMid slice"
        >
          {/* THE SOC FOOTPRINT */}
          <g stroke="#14b8a6" strokeWidth="1" fill="rgba(20, 184, 166, 0.05)">
            <rect x="860" y="440" width="200" height="200" rx="10" />
            <rect x="840" y="460" width="20" height="30" />
            <rect x="840" y="520" width="20" height="30" />
            <rect x="1060" y="460" width="20" height="30" />
            <rect x="1060" y="520" width="20" height="30" />
          </g>

          {/* PCB TRACES */}
          <g stroke="rgba(20, 184, 166, 0.2)" strokeWidth="1.5" fill="none">
            <path d="M 960 440 L 960 300 L 1100 150" />
            <path d="M 860 540 L 600 540 L 500 650" />
            <path d="M 1060 540 L 1300 540 L 1400 650" />
            <path d="M 960 640 L 960 800 L 800 950" />
          </g>

          {/* 4. FIXED ANIMATION: Constant length, moving offset for a true "laser" look */}
          <motion.path 
            d="M 960 440 L 960 300 L 1100 150" 
            stroke="#10b981" 
            strokeWidth="3"
            initial={{ pathLength: 0.3, pathOffset: -0.3 }}
            animate={{ pathOffset: 1 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            style={{ filter: "drop-shadow(0 0 8px #10b981)" }}
          />
          
          <motion.path 
            d="M 860 540 L 600 540 L 500 650" 
            stroke="#10b981" 
            strokeWidth="3"
            initial={{ pathLength: 0.3, pathOffset: -0.3 }}
            animate={{ pathOffset: 1 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
            style={{ filter: "drop-shadow(0 0 8px #10b981)" }}
          />
        </svg>

      </div>
    </div>
  );
}