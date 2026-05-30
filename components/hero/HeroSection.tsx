"use client";

import { motion, type Variants, useMotionValue, useSpring, useMotionTemplate, animate, useInView, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import {
  Mail, ArrowUpRight,
  Cpu,
  Code2,
  Layers,
  Terminal,
  Zap,
} from 'lucide-react'
import { GlowingOrb } from './GlowingOrb'
import { CursorSpotlight } from './CursorSpotlight'
import { GridBackground } from './GridBackground';
import { GlowText } from './GlowText'
import { PassingStar } from './PassingStar';
import { AmbientStarfield } from './AmbientStarfield';

/* ─── Animation variants ──────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1] as const,
      delay,
    },
  }),
}

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number) => ({
    opacity: 1,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
      delay,
    },
  }),
}

/* ─── Shared viewport config ──────────────────────────────────── */
const viewport = { once: true, margin: '-60px' }

/* ─── Animated Counter ────────────────────────────────────────── */
function AnimatedNumber({ value, isInfinity = false }: { value: number; isInfinity?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);

  const display = useTransform(count, (latest) => {
    if (isInfinity) {
      if (Math.round(latest) === value) return "999M+"; 
      return Math.round(latest).toLocaleString();
    }
    return Math.round(latest).toString().padStart(2, '0');
  });

  useEffect(() => {
    if (isInView) {
      animate(count, value, { 
        duration: 3.5, 
        ease: "easeOut" 
      });
    }
  }, [isInView, count, value]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

/* ─── Live Uptime Counter ────────────────────────────────────────── */
function LiveUptimeCounter() {
  const [uptime, setUptime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const deployDate = new Date(Date.UTC(2026, 4, 25, 12, 0, 0)).getTime();

    const updateUptime = () => {
      const now = new Date().getTime();
      const difference = now - deployDate;

      setUptime({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      });
    };

    updateUptime();
    const intervalId = setInterval(updateUptime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  if (!mounted) {
    return <span className="opacity-0">00:00:00:00</span>;
  }

  const pad = (num: number) => num.toString().padStart(2, "0");

  return (
    <span className="font-mono tracking-tight flex items-baseline">
      {pad(uptime.days)}<span className="text-[10px] sm:text-[12px] text-white/30 mr-0.5 sm:mr-1">D</span>
      {pad(uptime.hours)}<span className="text-[10px] sm:text-[12px] text-white/30 mr-0.5 sm:mr-1">H</span>
      {pad(uptime.minutes)}<span className="text-[10px] sm:text-[12px] text-white/30 mr-0.5 sm:mr-1">M</span>
      {pad(uptime.seconds)}<span className="text-[10px] sm:text-[12px] text-white/30">S</span>
    </span>
  );
}
/* ─── Main component ──────────────────────────────────────────── */
export function HeroSection() {
  // --- UPGRADED TRACKING LOGIC ---
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-1000); // Start off-screen so it doesn't glitch on load
  const mouseY = useMotionValue(-1000);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        // Get the exact boundary of the text box
        const rect = containerRef.current.getBoundingClientRect();
        // Calculate mouse position strictly inside the box
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Smooth out the mask movement
  const maskX = useSpring(mouseX, { stiffness: 400, damping: 40 });
  const maskY = useSpring(mouseY, { stiffness: 400, damping: 40 });

  // Adjusted the gradient size slightly for a tighter, more premium reveal
  const maskImage = useMotionTemplate`radial-gradient(250px circle at ${maskX}px ${maskY}px, transparent 0%, black 50%)`;
  // -------------------------------- ----------------------
  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center px-6 py-20 bg-transparent"
    >
      {/* Backgrounds */}
      <GridBackground />
      <CursorSpotlight />
      <PassingStar />
      
      

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

       
        {/* Hero content */}
        <div className="lg:col-span-7 flex flex-col items-start w-full">

         {/* THE 3-LAYER CINEMATIC TEXT */}
      <motion.div
        ref={containerRef} 
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative mb-6 z-20 w-full"
      >
        
        {/* --- LAYER 1: BASE OUTLINES --- */}
        <div className="flex flex-col uppercase leading-[0.85] tracking-tighter mix-blend-difference pointer-events-none">
          <span className="text-[64px] md:text-[80px] font-black text-transparent" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.5)' }}>
            Devojit
          </span>
          <span className="text-[64px] md:text-[80px] font-black text-transparent" style={{ WebkitTextStroke: '2px rgba(34,211,238,0.5)' }}>
            Mandal
          </span>
        </div>

        {/* --- LAYER 2: SOLID TEXT (Masked by Mouse) --- */}
        <motion.div
          className="absolute inset-0 flex flex-col uppercase leading-[0.85] tracking-tighter mix-blend-difference pointer-events-none"
          style={{ WebkitMaskImage: maskImage, maskImage: maskImage }}
        >
          <span className="text-[64px] md:text-[80px] font-black text-white">Devojit</span>
          
          {/* Restored your original Cyan Gradient props! */}
          <GlowText
            isGradient
            className="text-[64px] md:text-[80px] font-black"
            style={{
              background: 'linear-gradient(135deg, oklch(0.75 0.20 220) 0%, oklch(0.60 0.22 200) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            highlightColor="oklch(0.60 0.22 200 / 0.28)"
            radius={220}
          >
            Mandal
          </GlowText>
        </motion.div>

        {/* --- LAYER 3: STAR GLOW (18-Second Baked Timeline) --- */}
        <motion.div
          className="absolute inset-0 flex flex-col uppercase leading-[0.85] tracking-tighter pointer-events-none"
          style={{ filter: "drop-shadow(0px 15px 20px rgba(250,204,21,0.5))" }}
          animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
          transition={{ duration: 18, times: [0, 0.25, 0.35, 0.45, 0.55, 1], repeat: Infinity, ease: "linear" }}
        >
          <span className="text-[64px] md:text-[80px] font-black text-transparent" style={{ backgroundImage: 'linear-gradient(to top, rgba(250,204,21,0.95) 0%, transparent 35%)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>Devojit</span>
          <span className="text-[64px] md:text-[80px] font-black text-transparent" style={{ backgroundImage: 'linear-gradient(to top, rgba(250,204,21,0.95) 0%, transparent 35%)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>Mandal</span>
        </motion.div>

      </motion.div>
          {/* Headline */}
          {/* Sub-description */}
          {/* Space Identity Statement */}
          <motion.p
            variants={fadeUp}
            custom={0.22}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mb-8 max-w-[480px] text-[18px] leading-[1.7] text-[#888]"
          >
            I am an ECE student from the city that talks to space. My circuits are what makes <em className="text-[#fafaf8] not-italic font-medium">space exploration possible</em>.
          </motion.p>

          {/* Technical Grounding */}
          <motion.p
            variants={fadeUp}
            custom={0.32}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mb-12 max-w-[480px] text-[14px] leading-[1.6] text-white/40"
          >
            Designing systems that think in registers and render in pixels — from bare-metal C on microcontrollers to the React interfaces that monitor them.
          </motion.p>

          {/* CTA buttons */}
          {/* Stats Grid */}
          {/* Stats Grid */}
          <motion.div
            variants={fadeUp} custom={0.45} initial="hidden" whileInView="visible" viewport={viewport}
            // CRITICAL FIX: Changed to grid-cols-2 on mobile, grid-cols-4 on desktop
            className="mb-12 grid grid-cols-2 lg:grid-cols-4 gap-[1px] bg-white/10 border-[0.5px] border-white/10 rounded-xl overflow-hidden w-full max-w-3xl relative z-30"
          >
            {/* Box 1 (Takes 1 of 4 columns) */}
            <div className="bg-[#0a0a0a] p-4 sm:px-5 col-span-1">
              <div className="text-[22px] font-bold text-[#fafaf8] font-mono tracking-tight">
                <AnimatedNumber value={1} />
              </div>
              <div className="text-[11px] text-[#888] mt-1 tracking-[0.04em] uppercase">Year</div>
            </div>
            
            {/* Box 2 (Takes 1 of 4 columns) */}
            <div className="bg-[#0a0a0a] p-4 sm:px-5 col-span-1">
              <div className="text-[22px] font-bold text-[#fafaf8] font-mono tracking-tight">
                <AnimatedNumber value={5} />
              </div>
              <div className="text-[11px] text-[#888] mt-1 tracking-[0.04em] uppercase">Shipped projects</div>
            </div>

            {/* Box 3 (Takes 2 of 4 columns to fit the wide text) */}
            <div className="bg-[#0a0a0a] p-4 sm:px-5 flex flex-col justify-center overflow-hidden col-span-2 lg:col-span-2">
              {/* FIX 2: Reduced text-2xl to text-xl so it doesn't overflow */}
              <div className="text-lg sm:text-xl font-bold text-[#fafaf8] font-mono tracking-tight whitespace-nowrap">
                <LiveUptimeCounter />
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-[#888] mt-1 tracking-[0.04em] uppercase">
                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse shadow-[0_0_5px_#14b8a6] shrink-0"></span>
                <span>System Uptime</span>
              </div>
            </div>
          </motion.div>
          
        </div>
       {/* RIGHT COLUMN (Personalized Telemetry - SSD1306 OLED Style) */}
       <motion.div variants={fadeUp} custom={0.4} initial="hidden" whileInView="visible" viewport={viewport} className="hidden lg:flex lg:col-span-5 w-full justify-end">
          
          {/* 1. Hardware Bezel (The physical plastic screen border) */}
          <div className="w-full max-w-[360px] bg-[#050505] border-[4px] border-[#111] rounded-lg p-2 shadow-[0_0_30px_rgba(0,0,0,0.9)] relative">

            {/* 2. The OLED Screen Panel (Absolute Black) */}
            <div className="relative w-full bg-[#000] rounded-sm overflow-hidden border border-[#000] p-6">

              {/* 3. Pixel Grid / Scanline Overlay */}
              <div 
                className="absolute inset-0 pointer-events-none z-20 opacity-30 mix-blend-multiply" 
                style={{ 
                  backgroundImage: 'linear-gradient(transparent 50%, rgba(0, 0, 0, 0.9) 50%)', 
                  backgroundSize: '100% 4px' 
                }} 
              />

              {/* Screen Refresh Sweep (Slower, wider, subtle) */}
              <motion.div 
                animate={{ top: ['-20%', '120%'] }} 
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} 
                className="absolute left-0 right-0 h-[40px] bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent z-10 pointer-events-none" 
              />

              {/* --- TOP SECTION: SSD1306 Yellow Band --- */}
              <div className="flex justify-between items-center mb-5 border-b-[2px] border-amber-500/30 pb-3 relative z-10">
                <span className="font-mono text-sm font-bold text-amber-400 tracking-widest uppercase [text-shadow:0_0_6px_rgba(251,191,36,0.8)]">
                   SYS_IDENTITY
                </span>
                {/* Blocky blinking cursor instead of a round dot */}
                <motion.span 
                  // Hold at 100%, snap to 0%, hold at 0%
                  animate={{ opacity: [1, 1, 0, 0] }} 
                  transition={{ 
                    duration: 0.8, 
                    repeat: Infinity, 
                    // Snaps exactly at the 50% mark of the duration
                    times: [0, 0.5, 0.5, 1] 
                  }}
                  className="inline-block h-3 w-2 bg-amber-400 [box-shadow:0_0_6px_rgba(251,191,36,0.8)]" 
                />
              </div>

              {/* --- BOTTOM SECTION: SSD1306 Cyan Band --- */}
              <div className="space-y-4 font-mono text-[11.5px] text-cyan-400 relative z-10 [text-shadow:0_0_5px_rgba(34,211,238,0.6)] tracking-tight">
                <div className="flex justify-between items-end border-b border-cyan-900/30 pb-1">
                  <span className="opacity-70">GND_STATION</span>
                  <span className="font-bold">BLR_INDIA</span>
                </div>
                <div className="flex justify-between items-end border-b border-cyan-900/30 pb-1">
                  <span className="opacity-70">INSTITUTION</span>
                  <span className="font-bold">AIT</span>
                </div>
                <div className="flex justify-between items-end border-b border-cyan-900/30 pb-1">
                  <span className="opacity-70">UNIVERSITY</span>
                  <span className="font-bold">VTU_INDIA</span>
                </div>
                <div className="flex justify-between items-end border-b border-cyan-900/30 pb-1">
                  <span className="opacity-70">MAJOR</span>
                  <span className="font-bold">ECE_ENGINEERING</span>
                </div>
                <div className="flex justify-between items-end pb-1">
                  <span className="opacity-70">CURRENT_SEMESTER</span>
                  <span className="font-bold">02</span>
                </div>
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
