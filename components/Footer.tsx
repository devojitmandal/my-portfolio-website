"use client";

import { motion } from "framer-motion";
import { ArrowUp, TerminalSquare } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full py-12 border-t border-white/5 bg-[#050505] relative z-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="font-mono text-[10px] text-white/50 tracking-[0.2em] uppercase">
            Devojit Mandal © {new Date().getFullYear()}
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shadow-[0_0_8px_#14b8a6] animate-pulse" />
            <span className="font-mono text-[9px] text-teal-500/70 tracking-[0.3em] uppercase">
              SYS_NODE // BLR_INDIA
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 px-4 py-2 bg-white/[0.02] border border-white/10 rounded-sm">
          <TerminalSquare className="w-4 h-4 text-white/30" />
          <span className="font-mono text-[9px] sm:text-[10px] text-white/50 tracking-[0.15em] uppercase">
            Yes, AI helped build this site. <span className="text-teal-400 font-bold">That's the point.</span>
          </span>
        </div>

        <button
          onClick={scrollToTop}
          className="group flex flex-col items-center md:items-end gap-1 cursor-pointer bg-transparent border-none p-0"
        >
          <div className="flex items-center gap-2 font-mono text-[10px] text-white/40 group-hover:text-teal-400 tracking-[0.2em] uppercase transition-colors">
            System_Reboot
            <ArrowUp className="w-3 h-3 group-hover:-translate-y-1 transition-transform" />
          </div>
        </button>
      </div>
    </footer>
  );
}