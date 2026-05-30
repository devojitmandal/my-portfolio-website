"use client";
import { motion } from "framer-motion";

export function PassingStar() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden flex items-center justify-center z-0">
      
      {/* 1. The Diagonal Angle */}
      <div 
        className="absolute w-[200vw] h-[200vh] flex items-center justify-center"
        style={{ transform: "rotate(-35deg)" }} 
      >
        
        {/* 2. The 18-Second Flight Path */}
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            x: ["-100vw", "100vw"], // Fly from far left to far right
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* The White-Hot Core */}
          <div className="w-6 h-6 bg-white rounded-full z-10" style={{ boxShadow: "0 0 60px 30px rgba(250, 204, 21, 0.6)" }} />
          
          {/* The Massive Yellow Ambient Glow */}
          <div className="absolute w-[600px] h-[600px] bg-yellow-400/20 rounded-full blur-[80px]" />
          
          {/* The Light Trail dragging behind it */}
          <div className="absolute right-3 w-[800px] h-[2px] bg-gradient-to-r from-yellow-200/80 to-transparent blur-[1px]" />
        </motion.div>

      </div>
    </div>
  );
}