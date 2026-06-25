"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Cpu, Cloud, Terminal, ShieldCheck, Globe, ChevronLeft, ChevronRight } from "lucide-react";

// --- Procedural Circuit Board Background ---
const CircuitPattern = ({ colorClass }: { colorClass: string }) => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.15] mix-blend-screen" width="100%" height="100%">
    <defs>
      <pattern id="circuit-board" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 20 20 L 40 40 L 100 40" stroke="currentColor" fill="none" strokeWidth="1" />
        <circle cx="20" cy="20" r="2.5" fill="currentColor" />
        <circle cx="40" cy="40" r="2.5" fill="currentColor" />
        <path d="M 120 80 L 100 80 L 90 90 L 90 120" stroke="currentColor" fill="none" strokeWidth="1" />
        <circle cx="100" cy="80" r="2.5" fill="currentColor" />
        <circle cx="90" cy="90" r="2.5" fill="currentColor" />
        <path d="M 0 70 L 30 70 L 40 80 L 40 100 L 50 110 L 80 110" stroke="currentColor" fill="none" strokeWidth="1" />
        <circle cx="30" cy="70" r="2.5" fill="currentColor" />
        <circle cx="40" cy="80" r="2.5" fill="currentColor" />
        <circle cx="50" cy="110" r="2.5" fill="currentColor" />
        <circle cx="80" cy="20" r="1.5" fill="currentColor" />
        <circle cx="10" cy="100" r="1.5" fill="currentColor" />
      </pattern>
    </defs>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#circuit-board)" className={colorClass} />
  </svg>
);

const executionLog = [
  {
    id: "01",
    date: "CURRENT // 2026",
    title: "Firmware & Subsystem Development",
    role: "ACTIVE_EXECUTION",
    description: "Developing custom firmware for the Advanced Biometric Watch v3.0 using the ESP32-C3 microcontroller. Simultaneously preparing for upcoming university examinations.",
    icon: Cpu,
    status: "PROCESSING",
    color: "text-teal-400",
    baseBg: "rgba(20,184,166,0.05)",
    baseBorder: "rgba(20,184,166,0.2)",
    flashBg: "rgba(20,184,166,0.15)",
    flashBorder: "rgba(20,184,166,0.8)",
  },
  {
    id: "02",
    date: "JAN 2026",
    title: "Introduction to Generative AI",
    role: "GOOGLE CLOUD SKILLS BOOST",
    description: "Completed foundational training in Generative AI architectures and large language models, successfully verifying capabilities for AI-assisted development workflows.",
    icon: Cloud,
    status: "VERIFIED",
    color: "text-blue-400",
    baseBg: "rgba(59,130,246,0.05)",
    baseBorder: "rgba(59,130,246,0.2)",
    flashBg: "rgba(59,130,246,0.15)",
    flashBorder: "rgba(59,130,246,0.8)",
  },
  {
    id: "03",
    date: "DEC 2025",
    title: "Rapid Deployment: Resilience Hub",
    role: "FULL_STACK_ARCH",
    description: "Engineered and deployed the entire Resilience Hub web application in a single 24-hour development cycle utilizing AI-assisted tooling.",
    icon: Terminal,
    status: "COMPLETED",
    color: "text-amber-400",
    baseBg: "rgba(245,158,11,0.05)",
    baseBorder: "rgba(245,158,11,0.2)",
    flashBg: "rgba(245,158,11,0.15)",
    flashBorder: "rgba(245,158,11,0.8)",
  },
  {
    id: "04",
    date: "AUG 2025",
    title: "System Initialization: Core ECE",
    role: "ACHARYA INSTITUTE / VTU",
    description: "Commenced formal architectural training in Electronics and Communication Engineering. Secured placement following successful national-level entrance clearances.",
    icon: ShieldCheck,
    status: "BOOT_SUCCESS",
    color: "text-white/60",
    baseBg: "rgba(255,255,255,0.02)",
    baseBorder: "rgba(255,255,255,0.1)",
    flashBg: "rgba(255,255,255,0.08)",
    flashBorder: "rgba(255,255,255,0.6)",
  },
  {
    id: "05",
    date: "MAY 2026",
    title: "Interactive System Portfolio",
    role: "FRONTEND_ARCHITECT",
    description: "Architected a high-performance React/Next.js web application. Engineered custom procedural SVG fracture physics, scroll-linked data telemetry, and an interactive Bash terminal interface.",
    icon: Globe,
    status: "DEPLOYED",
    color: "text-purple-400",
    baseBg: "rgba(168,85,247,0.05)",
    baseBorder: "rgba(168,85,247,0.2)",
    flashBg: "rgba(168,85,247,0.15)",
    flashBorder: "rgba(168,85,247,0.8)",
  },
];

export function TimelineSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Interaction Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollLock = useRef(false);
  const touchStartX = useRef<number | null>(null);

  const changeIndex = (newIndex: number) => {
    setActiveIndex(newIndex);
  };

  const lockScroll = () => {
    scrollLock.current = true;
    setTimeout(() => { scrollLock.current = false; }, 600); 
  };

  // --- DESKTOP WHEEL SCROLL LOGIC ---
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleNativeWheel = (e: WheelEvent) => {
      if (window.innerWidth < 768) return; // Let touch events handle mobile

      // 1. Evaluate both axes independently with a much lower threshold (15) for trackpads
      const isTryingToGoNext = e.deltaX > 15 || e.deltaY > 15;
      const isTryingToGoPrev = e.deltaX < -15 || e.deltaY < -15;

      // 2. Scroll Release Logic (prevents trapping the user)
      const isAtStart = activeIndex === 0 && isTryingToGoPrev;
      const isAtEnd = activeIndex === executionLog.length - 1 && isTryingToGoNext;

      if (isAtStart || isAtEnd) {
        return; // Break out and let the page scroll normally!
      }

      // 3. Prevent default page scrolling while interacting with the carousel
      e.preventDefault(); 
      
      if (scrollLock.current) return;

      // 4. Trigger the slide
      if (isTryingToGoNext) {
        changeIndex(activeIndex + 1);
        lockScroll();
      } else if (isTryingToGoPrev) {
        changeIndex(activeIndex - 1);
        lockScroll();
      }
    };

    container.addEventListener("wheel", handleNativeWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleNativeWheel);
  }, [activeIndex]);

  // --- MOBILE SWIPE LOGIC ---
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const swipeDistance = touchStartX.current - touchEndX;

    // Threshold of 50px to trigger a swipe
    if (swipeDistance > 50 && activeIndex < executionLog.length - 1) {
      changeIndex(activeIndex + 1); // Swiped Left -> Next Card
    } else if (swipeDistance < -50 && activeIndex > 0) {
      changeIndex(activeIndex - 1); // Swiped Right -> Prev Card
    }
    
    touchStartX.current = null; // Reset
  };

  return (
    <section id="timeline" className="relative w-full py-24 z-10 overflow-hidden flex flex-col items-center">
      
      {/* HEADER */}
      <div className="mb-12 px-6 md:px-12 flex items-center gap-4 w-full max-w-7xl mx-auto">
        <motion.span 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="font-mono text-[11px] text-white/40 tracking-[0.3em] uppercase whitespace-nowrap"
        >
          // EXECUTION_LOG
        </motion.span>
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex-grow h-[1px] bg-gradient-to-r from-white/20 via-white/5 to-transparent origin-left"
        />
      </div>

      {/* 3D LASER CAROUSEL CONTAINER (Attached Swipe & Scroll listeners here) */}
      <div 
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative w-full max-w-7xl h-[550px] flex items-center justify-center px-4 touch-pan-y"
        style={{ perspective: "1000px" }} 
      >
        
        {/* LEFT NAV BUTTON */}
        <button
          onClick={() => changeIndex(activeIndex - 1)}
          disabled={activeIndex === 0}
          className="absolute left-2 md:left-8 z-50 p-3 md:p-4 rounded-full bg-[#050505] border border-teal-500/30 text-teal-400 hover:bg-teal-500/10 hover:shadow-[0_0_20px_rgba(20,184,166,0.5)] disabled:opacity-0 transition-all duration-300 group hidden md:block"
        >
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform drop-shadow-[0_0_8px_rgba(20,184,166,0.8)]" />
        </button>

        {/* RIGHT NAV BUTTON */}
        <button
          onClick={() => changeIndex(activeIndex + 1)}
          disabled={activeIndex === executionLog.length - 1}
          className="absolute right-2 md:right-8 z-50 p-3 md:p-4 rounded-full bg-[#050505] border border-teal-500/30 text-teal-400 hover:bg-teal-500/10 hover:shadow-[0_0_20px_rgba(20,184,166,0.5)] disabled:opacity-0 transition-all duration-300 group hidden md:block"
        >
          <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform drop-shadow-[0_0_8px_rgba(20,184,166,0.8)]" />
        </button>

        {/* THE CARD STACK */}
        <div className="relative w-[300px] md:w-[320px] h-[500px]" style={{ transformStyle: "preserve-3d" }}>
          
          {executionLog.map((log, index) => {
            const offset = index - activeIndex;
            const isActive = index === activeIndex;
            
            return (
              <motion.div 
                key={log.id}
                onClick={() => setActiveIndex(index)}
                animate={{
                  x: `${offset * 115}%`, 
                  scale: isActive ? 1 : 0.8,
                  opacity: isActive ? 1 : 0.25,
                  rotateY: offset * -15, 
                  zIndex: 30 - Math.abs(offset), 
                  boxShadow: isActive 
                    ? [`0 0 0px ${log.baseBorder}`, `0 0 60px ${log.flashBorder}`, `0 0 20px ${log.baseBorder}`] 
                    : "0 0 0px transparent",
                  borderColor: isActive 
                    ? [log.baseBorder, log.flashBorder, log.baseBorder] 
                    : log.baseBorder
                }}
                transition={{ 
                  default: { type: "spring", stiffness: 200, damping: 25 },
                  boxShadow: { delay: 0.4, duration: 0.8, times: [0, 0.2, 1], ease: "easeOut" },
                  borderColor: { delay: 0.4, duration: 0.8, times: [0, 0.2, 1], ease: "easeOut" }
                }}
                className={`absolute inset-0 p-6 rounded-sm border backdrop-blur-md overflow-hidden flex flex-col ${isActive ? 'cursor-default' : 'cursor-pointer hover:border-white/30 transition-colors duration-300'}`}
                style={{ backgroundColor: isActive ? log.flashBg : log.baseBg }}
              >
                
                <CircuitPattern colorClass={log.color} />
                
                <div className="absolute top-2 left-2 w-1 h-1 rounded-full bg-white/20 shadow-[inset_0_1px_1px_rgba(0,0,0,1)] z-10"></div>
                <div className="absolute top-2 right-2 w-1 h-1 rounded-full bg-white/20 shadow-[inset_0_1px_1px_rgba(0,0,0,1)] z-10"></div>
                <div className="absolute bottom-2 left-2 w-1 h-1 rounded-full bg-white/20 shadow-[inset_0_1px_1px_rgba(0,0,0,1)] z-10"></div>
                <div className="absolute bottom-2 right-2 w-1 h-1 rounded-full bg-white/20 shadow-[inset_0_1px_1px_rgba(0,0,0,1)] z-10"></div>
                
                <div className="relative z-10 flex flex-col h-full pointer-events-none">
                  <div className="flex items-start justify-between mb-6 border-b border-white/10 pb-4">
                    <div className="flex flex-col gap-3">
                      <div className="w-10 h-10 rounded bg-[#0a0a0a] border border-white/20 flex items-center justify-center">
                        <log.icon className={`w-5 h-5 ${log.color}`} />
                      </div>
                      <div className="font-mono text-[10px] text-white/50 tracking-widest uppercase bg-black/50 px-2 py-1 rounded-sm w-fit border border-white/5">
                        {log.date}
                      </div>
                    </div>

                    <span className={`font-mono text-[9px] uppercase tracking-widest bg-[#0a0a0a]/90 px-2 py-1.5 rounded-sm border border-white/10 ${
                      log.status === "PROCESSING" ? "text-teal-400 animate-pulse" : 
                      log.status === "VERIFIED" ? "text-blue-400" : "text-white/40"
                    }`}>
                      [{log.status}]
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest block mb-3">
                      {log.role}
                    </span>
                    <h3 className="text-white font-bold text-xl tracking-wide leading-snug drop-shadow-md">
                      {log.title}
                    </h3>
                  </div>
                  
                  <p className="text-sm text-white/60 leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mt-auto">
                    {log.description}
                  </p>
                  
                  <div className="absolute -bottom-4 right-0 font-mono text-[9px] text-white/30 bg-black/60 px-2 py-1 rounded border border-white/5">
                    SEQ_{log.id}
                  </div>
                </div>
              </motion.div>
            );
          })}

        </div>
      </div>

      {/* THE NEON DATA BUS (TRACK) */}
      <div className="relative w-[300px] md:w-[320px] h-8 mt-8">
        
        {/* The solid rail line */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -translate-y-1/2 rounded-full" />
        
        {/* THE NEW DYNAMIC DIAGONAL LASER */}
        <svg 
          className="absolute bottom-1/2 left-0 w-full h-[100px] pointer-events-none z-0 overflow-visible" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
        >
          <motion.path
            key={`laser-${activeIndex}`}
            initial={{ pathLength: 0, opacity: 1 }}
            animate={{ pathLength: 1, opacity: [1, 1, 0] }}
            transition={{ 
              pathLength: { duration: 0.3, delay: 0.2, ease: "easeOut" },
              opacity: { duration: 0.4, delay: 0.3 }
            }}
            // Math magic: Calculates exactly where the dot is (0% to 100%) and draws a line to the center (50%)
            d={`M ${(activeIndex / (executionLog.length - 1)) * 100} 100 L 50 0`}
            stroke="#2dd4bf"
            strokeWidth="2"
            fill="none"
            vectorEffect="non-scaling-stroke"
            style={{ filter: "drop-shadow(0 0 8px #2dd4bf)" }}
          />
        </svg>

        {/* The Nodes */}
        <div className="absolute inset-0 flex justify-between items-center z-10">
          {executionLog.map((log, index) => (
            <div 
              key={`node-${log.id}`} 
              className="relative w-4 h-4 flex items-center justify-center cursor-pointer group"
              onClick={() => setActiveIndex(index)}
            >
              {/* Dim inactive dots */}
              <div className="w-1.5 h-1.5 bg-white/30 rounded-full group-hover:bg-white/60 transition-colors" />
              
              {/* The Active Neon Circle */}
              {activeIndex === index && (
                <motion.div
                  layoutId="neon-slider"
                  className="absolute inset-0 rounded-full border border-teal-400 bg-teal-500/20 shadow-[0_0_15px_#2dd4bf]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}