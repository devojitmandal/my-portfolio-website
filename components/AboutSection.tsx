"use client";

import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { Download, ArrowUpRight, Cpu } from "lucide-react";

export function AboutSection() {
    const directiveText = "I am an Electronics and Communication Engineering student based in Bangalore, operating at the intersection of physical hardware and digital interfaces.\n\nMy development philosophy focuses on full-spectrum engineering. Whether it is writing custom C drivers for ESP32 microcontrollers, managing memory allocation in bare-metal environments, or building responsive UI components in React, I treat every layer of the stack as an interconnected system.\n\nCurrently expanding my infrastructure capabilities through dedicated Cloud Engineering programs, ensuring that the data processed at the edge can be securely and efficiently managed in the cloud.";

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => directiveText.slice(0, latest));

  // 1. TYPINGS FIXED HERE
  const textRef = useRef<HTMLDivElement>(null);
  const isTextInView = useInView(textRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isTextInView) {
      animate(count, directiveText.length, {
        type: "tween",
        duration: 4, // High-speed terminal boot (4 seconds total)
        ease: "linear",
      });
    }
  }, [isTextInView, count, directiveText.length]);

  return (
    <section id="about" className="relative w-full py-24 z-10 border-t border-white/5">
      
      {/* Section Header */}
      <div className="mb-16">
        <h2 className="font-mono text-sm text-teal-500 tracking-[0.3em] uppercase mb-4 flex items-center gap-4">
          <span className="w-8 h-[1px] bg-teal-500/50"></span>
          System_Profile
        </h2>
        <p className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Bridging the gap between <span className="text-white/40">bare-metal hardware</span> and <span className="text-white/40">scalable web architecture.</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        
        {/* 1. NAKED TEXT NARRATIVE (No Glass Box) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="md:col-span-7 flex flex-col justify-center relative pl-8 py-4"
        >
          {/* Glowing left border line instead of a box */}
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-teal-500 via-white/10 to-transparent"></div>
          
          <div className="font-mono text-[13px] text-white/40 tracking-widest mb-8 uppercase flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-white/50"></span>
            Primary_Directive
          </div>
          {/* THE NEW TYPEWRITER BLOCK */}
          <div 
            ref={textRef} 
            className="text-white/70 leading-relaxed text-sm whitespace-pre-wrap"
          >
            <motion.span>{displayText}</motion.span>
            
            {/* Blinking Teal Cursor */}
            <motion.span
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
              className="inline-block w-2 h-3.5 bg-teal-500 ml-1 align-middle shadow-[0_0_8px_rgba(20,184,166,0.5)]"
            />
          </div>
        </motion.div>

        {/* Technical Specifications (Span 5) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:col-span-5 flex flex-col gap-6"
        >
          {/* 2. SOLID HARDWARE PANEL (Core Specs) */}
          <div className="rounded border border-white/10 bg-[#050505] p-6 relative overflow-hidden shadow-[inset_0_0_40px_rgba(20,184,166,0.02)]">
            {/* Physical hardware details (Screw holes) */}
            <div className="absolute top-2 left-2 w-1 h-1 rounded-full bg-white/10 shadow-[inset_0_1px_1px_rgba(0,0,0,1)]"></div>
            <div className="absolute top-2 right-2 w-1 h-1 rounded-full bg-white/10 shadow-[inset_0_1px_1px_rgba(0,0,0,1)]"></div>
            <div className="absolute bottom-2 left-2 w-1 h-1 rounded-full bg-white/10 shadow-[inset_0_1px_1px_rgba(0,0,0,1)]"></div>
            <div className="absolute bottom-2 right-2 w-1 h-1 rounded-full bg-white/10 shadow-[inset_0_1px_1px_rgba(0,0,0,1)]"></div>
            
            <div className="absolute -top-4 -right-4 p-4 opacity-5">
              <Cpu className="w-32 h-32 text-white" />
            </div>
            
            <div className="font-mono text-[10px] text-white/40 tracking-widest mb-6 uppercase inline-block border-b border-white/10 pb-2">
              // Core_Specs
            </div>
            
            <ul className="space-y-4 font-mono text-xs relative z-10">
              <li className="flex justify-between items-end border-b border-white/5 pb-2">
                <span className="text-white/40 text-[9px]">OPERATIVE</span>
                {/* 2. IDENTITY FIXED HERE */}
                <span className="text-white">DEVOJIT MANDAL</span>
              </li>
              <li className="flex justify-between items-end border-b border-white/5 pb-2">
                <span className="text-white/40 text-[9px]">UPTIME</span>
                <span className="text-teal-400">19_YEARS</span>
              </li>
              <li className="flex justify-between items-end border-b border-white/5 pb-2">
                <span className="text-white/40 text-[9px]">VTU_USN</span>
                {/* 3. IDENTITY FIXED HERE */}
                <span className="text-white">1AY25EC045</span>
              </li>
              <li className="flex justify-between items-end pb-1">
                <span className="text-white/40 text-[9px]">LOCATION</span>
                <span className="text-amber-400">BLR_INDIA</span>
              </li>
            </ul>
          </div>

          {/* 3. TERMINAL CONSOLE (Resume Extraction) */}
          <div className="rounded border border-teal-500/20 bg-teal-500/[0.02] flex flex-col flex-grow relative overflow-hidden">
            {/* Industrial hazard stripe header */}
            <div 
              className="h-1 w-full opacity-30"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 4px, #14b8a6 4px, #14b8a6 8px)'
              }}
            />
            
            <div className="p-6 flex flex-col h-full justify-between">
              <div className="font-mono text-[10px] text-teal-500/70 uppercase tracking-widest mb-4">
                System_Documentation
              </div>
              
              <div className="flex flex-col gap-4">
                {/* Raw Terminal Output box */}
                <div className="font-mono text-[10px] text-white/40 space-y-1.5 bg-[#020202] p-3 rounded-sm border border-white/5 shadow-[inset_0_0_15px_rgba(0,0,0,1)]">
                  <div><span className="text-teal-500">root@sys</span>:~# locate resume</div>
                  <div className="text-white/60">&gt; File: MY_RESUME_2026.pdf</div>
                  <div className="text-teal-500/50 animate-pulse">_</div>
                </div>

                {/* Solid, non-glass action button */}
                <a 
                  href="/resume.pdf" 
                  download="MY_RESUME_2026.pdf"
                  className="group flex items-center justify-between p-3 bg-teal-500 text-black hover:bg-teal-400 transition-colors rounded-sm shadow-[0_0_15px_rgba(20,184,166,0.3)]"
                >
                  <div className="flex items-center gap-3">
                    <Download className="w-4 h-4" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wide">
                      Extract_PDF
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}