"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Cpu, Cloud, Terminal, ShieldCheck, Globe } from "lucide-react";

// --- NEW: Procedural Circuit Board Background ---
const CircuitPattern = ({ colorClass }: { colorClass: string }) => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.15] mix-blend-screen" width="100%" height="100%">
    <defs>
      <pattern id="circuit-board" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
        {/* Trace 1 */}
        <path d="M 20 0 L 20 20 L 40 40 L 100 40" stroke="currentColor" fill="none" strokeWidth="1" />
        <circle cx="20" cy="20" r="2.5" fill="currentColor" />
        <circle cx="40" cy="40" r="2.5" fill="currentColor" />
        
        {/* Trace 2 */}
        <path d="M 120 80 L 100 80 L 90 90 L 90 120" stroke="currentColor" fill="none" strokeWidth="1" />
        <circle cx="100" cy="80" r="2.5" fill="currentColor" />
        <circle cx="90" cy="90" r="2.5" fill="currentColor" />

        {/* Trace 3 */}
        <path d="M 0 70 L 30 70 L 40 80 L 40 100 L 50 110 L 80 110" stroke="currentColor" fill="none" strokeWidth="1" />
        <circle cx="30" cy="70" r="2.5" fill="currentColor" />
        <circle cx="40" cy="80" r="2.5" fill="currentColor" />
        <circle cx="50" cy="110" r="2.5" fill="currentColor" />

        {/* Floating Vias */}
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
    baseBorder: "rgba(20,184,166,0.3)",
    flashBg: "rgba(20,184,166,0.15)",
    flashBorder: "rgba(20,184,166,0.5)"
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
    baseBorder: "rgba(59,130,246,0.3)",
    flashBg: "rgba(59,130,246,0.15)",
    flashBorder: "rgba(59,130,246,0.5)"
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
    baseBorder: "rgba(245,158,11,0.3)",
    flashBg: "rgba(245,158,11,0.15)",
    flashBorder: "rgba(245,158,11,0.5)"
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
    flashBorder: "rgba(255,255,255,0.3)"
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
    baseBorder: "rgba(168,85,247,0.3)",
    flashBg: "rgba(168,85,247,0.15)",
    flashBorder: "rgba(168,85,247,0.5)"
  },
];

export function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const traceHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="timeline" className="relative w-full py-24 z-10">
      
      <div className="mb-16 flex items-center gap-4">
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

      <div ref={containerRef} className="relative max-w-3xl mx-auto pl-4 md:pl-0">
        
        <div className="absolute left-[15px] md:left-[50px] top-0 bottom-0 w-[1px] bg-white/5"></div>
        
        <motion.div 
          style={{ height: traceHeight }}
          className="absolute left-[15px] md:left-[50px] top-0 w-[2px] bg-gradient-to-t from-teal-400 via-teal-500 to-transparent shadow-[0_0_15px_#14b8a6] origin-top"
        />

        <div className="space-y-12">
          {executionLog.map((log, index) => {
            const slideDirection = index % 2 === 0 ? -50 : 50;
            
            return (
              <motion.div 
                key={log.id}
                initial={{ opacity: 0, x: slideDirection }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40% 0px -40% 0px" }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className="relative pl-12 md:pl-24 group"
              >
                
                {/* THE HARDWARE NODE */}
                <div className="absolute left-0 md:left-[35px] top-4 w-8 h-8 rounded bg-[#0a0a0a] border border-white/20 flex items-center justify-center z-20">
                  <log.icon className={`w-4 h-4 ${log.color}`} />
                  
                  <motion.span 
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 1] }}
                    viewport={{ once: true, margin: "-40% 0px -40% 0px" }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 rounded bg-teal-500 mix-blend-screen shadow-[0_0_15px_#14b8a6]"
                  />

                  {log.status === "PROCESSING" && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-teal-500 animate-pulse shadow-[0_0_8px_#14b8a6]"></span>
                  )}
                </div>

                {/* THE HORIZONTAL DATA BRANCH */}
                <div className="absolute left-[15px] md:left-[50px] top-8 w-8 md:w-16 h-[1px] bg-white/5 z-0 overflow-hidden">
                  <motion.div
                    initial={{ x: "-100%" }}
                    whileInView={{ x: "100%" }}
                    viewport={{ once: true, margin: "-40% 0px -40% 0px" }}
                    transition={{ duration: 0.3, delay: 0.1, ease: "linear" }}
                    className="w-full h-full bg-teal-400 shadow-[0_0_8px_#2dd4bf]"
                  />
                </div>

                {/* THE CONSOLE BOX (Now a Glass Circuit Board) */}
                <motion.div 
                  initial={{ backgroundColor: log.baseBg, borderColor: log.baseBorder }}
                  whileInView={{ 
                    backgroundColor: [log.baseBg, log.flashBg, log.baseBg],
                    borderColor: [log.baseBorder, log.flashBorder, log.baseBorder]
                  }}
                  viewport={{ once: true, margin: "-40% 0px -40% 0px" }}
                  transition={{ duration: 0.6, delay: 0.3, times: [0, 0.2, 1] }}
                  // Increased blur from sm to md to make the glass thicker over the circuits
                  className="relative p-6 rounded-sm border backdrop-blur-md overflow-hidden"
                >
                  
                  {/* --- INJECTING THE CIRCUIT LAYER --- */}
                  <CircuitPattern colorClass={log.color} />
                  
                  {/* Active Processing Pulse */}
                  {log.status === "PROCESSING" && (
                    <span className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-teal-500/50 to-transparent animate-pulse shadow-[0_0_10px_#14b8a6]"></span>
                  )}
                  
                  <div className="absolute top-2 left-2 w-1 h-1 rounded-full bg-white/20 shadow-[inset_0_1px_1px_rgba(0,0,0,1)] z-10"></div>
                  <div className="absolute bottom-2 left-2 w-1 h-1 rounded-full bg-white/20 shadow-[inset_0_1px_1px_rgba(0,0,0,1)] z-10"></div>
                  
                  {/* Pushed all text content to z-10 so it sits clearly above the circuit traces */}
                  <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 gap-2 border-b border-white/5 pb-4">
                      <div>
                        <div className="font-mono text-[10px] text-white/40 tracking-widest uppercase mb-1 bg-black/40 px-2 py-0.5 inline-block rounded-sm">
                          {log.date}
                        </div>
                        <h3 className="text-white font-bold text-lg tracking-wide mt-2">
                          {log.title}
                        </h3>
                      </div>
                      
                      <div className="flex flex-col md:items-end">
                        <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest">
                          {log.role}
                        </span>
                        <span className={`font-mono text-[9px] uppercase tracking-widest mt-1 bg-[#0a0a0a]/80 px-2 py-1 rounded-sm border border-white/5 ${
                          log.status === "PROCESSING" ? "text-teal-400" : 
                          log.status === "VERIFIED" ? "text-blue-400" : "text-white/30"
                        }`}>
                          [{log.status}]
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-white/60 leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      {log.description}
                    </p>
                    
                    <div className="absolute -bottom-4 right-0 font-mono text-[8px] text-white/20 bg-black/50 px-1 rounded">
                      SEQ_{log.id}
                    </div>
                  </div>
                </motion.div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}