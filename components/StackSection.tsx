"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Zap, Code2, Cloud, Bot } from "lucide-react";

// Custom GitHub Brand Icon
function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

const systemStack = [
  { name: "C / Bare-Metal", level: "intermediate", icon: Cpu, color: "text-amber-500", glow: "group-hover:border-amber-500/50 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.2)]" },
  { name: "ESP32 / IoT", level: "hands-on", icon: Zap, color: "text-amber-400", glow: "group-hover:border-amber-400/50 group-hover:shadow-[0_0_15px_rgba(251,191,36,0.2)]" },
  { name: "React / UI", level: "intermediate", icon: Code2, color: "text-cyan-400", glow: "group-hover:border-cyan-400/50 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]" },
  { name: "Cloud Infra", level: "architecting", icon: Cloud, color: "text-blue-400", glow: "group-hover:border-blue-400/50 group-hover:shadow-[0_0_15px_rgba(96,165,250,0.2)]" },
  { name: "AI Tooling", level: "advanced user", icon: Bot, color: "text-teal-400", glow: "group-hover:border-teal-400/50 group-hover:shadow-[0_0_15px_rgba(45,212,191,0.2)]" },
  { name: "GitHub", level: "daily", icon: GithubIcon, color: "text-white/70", glow: "group-hover:border-white/40 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]" }
];

// --- THE PROCEDURAL FRACTURE GENERATOR ---
const generateShatter = () => {
  // 1. Pick a random impact epicenter (between 20% and 80% of the card area)
  const cx = 20 + Math.random() * 60;
  const cy = 20 + Math.random() * 60;
  const paths = [];

  // 2. Determine how many main fracture veins shoot out (5 to 8 veins)
  const numVeins = Math.floor(Math.random() * 4) + 5;

  for (let i = 0; i < numVeins; i++) {
    // Distribute veins in a circle, with organic wobble
    const baseAngle = (i * (Math.PI * 2)) / numVeins;
    const angle = baseAngle + (Math.random() * 0.6 - 0.3);

    // Create a jagged midpoint for the fracture to change direction
    const midDist = 15 + Math.random() * 25;
    const midX = cx + Math.cos(angle) * midDist;
    const midY = cy + Math.sin(angle) * midDist;

    // Calculate the end point (shooting violently off the edge of the card)
    const endDist = 80 + Math.random() * 50;
    const endX = midX + Math.cos(angle + (Math.random() * 0.4 - 0.2)) * endDist;
    const endY = midY + Math.sin(angle + (Math.random() * 0.4 - 0.2)) * endDist;

    paths.push(`M ${cx} ${cy} L ${midX} ${midY} L ${endX} ${endY}`);

    // 3. 60% chance for a main vein to spawn a secondary "splinter"
    if (Math.random() > 0.4) {
      const splinterAngle = angle + (Math.random() > 0.5 ? 0.6 : -0.6);
      const splinterDist = 30 + Math.random() * 20;
      const sEndX = midX + Math.cos(splinterAngle) * splinterDist;
      const sEndY = midY + Math.sin(splinterAngle) * splinterDist;
      paths.push(`M ${midX} ${midY} L ${sEndX} ${sEndY}`);
    }
  }
  return paths;
};


function TechCard({ tech, index }: { tech: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [activeCrackPaths, setActiveCrackPaths] = useState<string[]>([]);
  const delayBase = index * 0.15;
  
  // Generate a brand new algorithmic shatter every time the mouse enters
  const handleMouseEnter = () => {
    setActiveCrackPaths(generateShatter());
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ 
        opacity: [0, 1, 1], 
        y: [20, 0, 0],
        scale: [0.95, 1.02, 1],
        backgroundColor: ["rgba(255,255,255,0.02)", "rgba(20,184,166,0.1)", "rgba(255,255,255,0.02)"],
        borderColor: ["rgba(255,255,255,0.05)", "rgba(20,184,166,0.4)", "rgba(255,255,255,0.05)"]
      }}
      viewport={{ once: true, margin: "-150px" }}
      transition={{ duration: 0.7, delay: delayBase, times: [0, 0.4, 1] }}
      className={`group relative flex flex-col p-5 rounded-xl border bg-white/[0.02] backdrop-blur-sm transition-all duration-300 overflow-hidden ${tech.glow}`}
    >
      
      {/* THE PROCEDURAL SHATTER RENDERER */}
      <div className="absolute inset-0 pointer-events-none z-0 mix-blend-screen opacity-60">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {activeCrackPaths.map((path, i) => (
            <motion.path
              key={i}
              d={path}
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="0.5"
              fill="none"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: isHovered ? 1 : 0, 
                opacity: isHovered ? 1 : 0 
              }}
              transition={{ 
                duration: isHovered ? 0.1 : 0.8, 
                ease: isHovered ? "easeOut" : "easeInOut",
                delay: isHovered ? i * 0.01 : 0 
              }}
              style={{ filter: "drop-shadow(0 0 2px rgba(255,255,255,0.5))" }}
            />
          ))}
        </svg>
      </div>

      <div className="absolute top-4 right-4 flex gap-1.5 items-center z-10">
        <motion.span 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: [0, 1, 0] }} 
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 0.2, delay: delayBase + 0.6 }} 
          className="w-1 h-1 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.9)]" 
        />
        <motion.span 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: [0, 1, 0] }} 
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 0.2, delay: delayBase + 0.8 }} 
          className="w-1 h-1 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.9)]" 
        />
        <motion.span 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 0.2, delay: delayBase + 1.1 }} 
          className="w-1.5 h-1.5 bg-teal-500 rounded-full shadow-[0_0_8px_#14b8a6]" 
        />
      </div>

      <div className={`mb-6 relative z-10 ${tech.color}`}>
        <tech.icon strokeWidth={1.5} className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
      </div>

      <div className="mt-auto relative z-10">
        <h3 className="text-white font-medium text-sm mb-1 tracking-wide">
          {tech.name}
        </h3>
        <p className="font-mono text-[10px] text-white/40 lowercase">
          {tech.level}
        </p>
      </div>
      
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/10 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
    </motion.div>
  );
}

export function StackSection() {
  return (
    <section id="stack" className="relative w-full py-20 z-10">
      
      <div className="mb-10 flex items-center gap-4">
        <motion.span 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="font-mono text-[11px] text-white/40 tracking-[0.3em] uppercase whitespace-nowrap"
        >
          // COMPONENT_INVENTORY
        </motion.span>
        
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex-grow h-[1px] bg-gradient-to-r from-teal-500/50 via-white/10 to-transparent origin-left"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {systemStack.map((tech, index) => (
          <TechCard key={tech.name} tech={tech} index={index} />
        ))}
      </div>

    </section>
  );
}