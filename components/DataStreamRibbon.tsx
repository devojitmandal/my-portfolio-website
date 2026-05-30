"use client";

import { motion } from "framer-motion";
import { Cpu, Code2, Zap, Terminal, MonitorSmartphone, Database } from "lucide-react";

// --- The Data Arrays ---
// We repeat the arrays a few times to ensure the screen is completely filled 
// before the loop resets, preventing any blank spaces.

const hardwareStack = [
  { name: "BARE-METAL C", icon: Terminal },
  { name: "ESP32-C3", icon: Cpu },
  { name: "RTOS", icon: Zap },
  { name: "WOKWI", icon: MonitorSmartphone },
  { name: "I2C / SPI", icon: Database },
  { name: "BARE-METAL C", icon: Terminal },
  { name: "ESP32-C3", icon: Cpu },
  { name: "RTOS", icon: Zap },
  { name: "WOKWI", icon: MonitorSmartphone },
  { name: "I2C / SPI", icon: Database },
];

const softwareStack = [
  { name: "REACT.JS", icon: Code2 },
  { name: "NEXT.JS", icon: Terminal },
  { name: "TYPESCRIPT", icon: Code2 },
  { name: "TAILWIND CSS", icon: Zap },
  { name: "SUPABASE", icon: Database },
  { name: "REACT.JS", icon: Code2 },
  { name: "NEXT.JS", icon: Terminal },
  { name: "TYPESCRIPT", icon: Code2 },
  { name: "TAILWIND CSS", icon: Zap },
  { name: "SUPABASE", icon: Database },
];

export function DataStreamRibbon() {
  return (
    <section className="relative w-full py-8 bg-[#0a0a0a] border-t-[0.5px] border-white/10 overflow-hidden flex flex-col gap-4 z-20">
      
      {/* THE FADE MASKS: 
        These gradients make the text smoothly fade into the darkness at the edges of the screen.
      */}
      <div className="absolute inset-0 z-10 pointer-events-none" 
           style={{ background: 'linear-gradient(to right, #0a0a0a 0%, transparent 15%, transparent 85%, #0a0a0a 100%)' }} />

      {/* TRACK 1: HARDWARE (Moves Left) */}
      <div className="flex w-full overflow-hidden">
        <motion.div
          className="flex w-max items-center gap-8 pr-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity }}
        >
          {hardwareStack.map((item, i) => (
            <div key={i} className="flex items-center gap-3 group">
              <item.icon className="w-4 h-4 text-amber-500/50 transition-colors group-hover:text-amber-400" />
              <span className="font-mono text-[11px] tracking-[0.2em] text-[#888] whitespace-nowrap transition-colors group-hover:text-[#fafaf8]">
                {item.name}
              </span>
              <span className="text-white/10 ml-5">//</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* TRACK 2: SOFTWARE (Moves Right) */}
      <div className="flex w-full overflow-hidden">
        <motion.div
          className="flex w-max items-center gap-8 pr-8"
          // By animating from -50% to 0%, it moves in the exact opposite direction!
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        >
          {softwareStack.map((item, i) => (
            <div key={i} className="flex items-center gap-3 group">
              <item.icon className="w-4 h-4 text-teal-500/50 transition-colors group-hover:text-teal-400" />
              <span className="font-mono text-[11px] tracking-[0.2em] text-[#888] whitespace-nowrap transition-colors group-hover:text-[#fafaf8]">
                {item.name}
              </span>
              <span className="text-white/10 ml-5">//</span>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}