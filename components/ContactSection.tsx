"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Copy, CheckCircle2, Mail, Network } from "lucide-react";

// --- OFFICIAL BRAND SVGS ---
function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

export function ContactSection() {
  const [isCopied, setIsCopied] = useState(false);
  
  // REPLACE THIS WITH YOUR ACTUAL EMAIL
  const emailAddress = "devojitmandal9876@gmail.com"; 

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2500); // Resets back to normal after 2.5 seconds
  };

  return (
    <section id="contact" className="relative w-full py-32 z-10">
      
      {/* ANIMATED SECTION HEADER */}
      <div className="mb-16 flex items-center gap-4 max-w-4xl mx-auto px-6">
        <motion.span 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="font-mono text-[11px] text-[#888] tracking-[0.3em] uppercase whitespace-nowrap flex items-center gap-2"
        >
          <Network className="w-3 h-3" /> // CONTACT_ME
        </motion.span>
        
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex-grow h-[1px] bg-gradient-to-r from-white/20 via-white/5 to-transparent origin-left"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* PRIMARY NODE: EMAIL COPY BUTTON (Spans both columns on desktop) */}
          <button 
            onClick={handleCopyEmail}
            className={`group relative md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-8 p-8 md:p-10 rounded-xl bg-black/40 backdrop-blur-xl border transition-all duration-500 overflow-hidden ${
              isCopied ? 'border-teal-500/50 shadow-[0_0_30px_rgba(45,212,191,0.15)]' : 'border-white/10 hover:border-white/30 hover:bg-white/[0.02]'
            }`}
          >
            {/* Background Pulse Effect on Copy */}
            <AnimatePresence>
              {isCopied && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-teal-500/5 pointer-events-none"
                />
              )}
            </AnimatePresence>

            <div className={`shrink-0 w-14 h-14 rounded-full flex items-center justify-center border transition-colors duration-500 z-10 ${
              isCopied ? 'bg-teal-500/20 border-teal-500/50 text-teal-400' : 'bg-white/5 border-white/10 text-white/50 group-hover:text-white'
            }`}>
              {isCopied ? <CheckCircle2 className="w-6 h-6" /> : <Mail className="w-6 h-6" />}
            </div>

            <div className="flex flex-col text-left z-10">
              <span className="font-mono text-[10px] text-white/40 tracking-[0.2em] uppercase mb-2">
                Primary_Communication_Protocol
              </span>
              <span className={`text-xl md:text-3xl font-bold tracking-tight transition-colors duration-500 mb-4 ${
                isCopied ? 'text-teal-400' : 'text-white'
              }`}>
                {emailAddress}
              </span>

              {/* MOVED HERE: Now perfectly stacked under the email! */}
              <div className="flex items-center gap-2">
                <span className={`font-mono text-xs uppercase tracking-widest transition-colors duration-500 ${
                  isCopied ? 'text-teal-400 font-bold' : 'text-white/30 group-hover:text-white/60'
                }`}>
                  {isCopied ? '[ COPIED TO CLIPBOARD ]' : 'COPY_ADDRESS'}
                </span>
                {!isCopied && <Copy className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />}
              </div>
            </div>
          </button>

          {/* SECONDARY NODE 1: LINKEDIN */}
          <a 
            href="https://www.linkedin.com/in/devojit-mandal/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex flex-col justify-between p-8 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-500 min-h-[200px]"
          >
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:border-blue-500/50 transition-colors duration-500">
                <LinkedinIcon className="w-5 h-5 text-white/50 group-hover:text-blue-400 transition-colors" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-blue-400 transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
            
            <div className="flex flex-col mt-8">
              <span className="font-mono text-[10px] text-white/40 tracking-[0.2em] uppercase mb-1">
                Professional_Network
              </span>
              <span className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                LinkedIn
              </span>
            </div>
          </a>

          {/* SECONDARY NODE 2: GITHUB */}
          <a 
            href="https://github.com/devojitmandal" 
            target="_blank" 
            rel="noopener noreferrer"
            
            className="group flex flex-col justify-between p-8 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10 hover:border-green-500/50 hover:bg-green-500/5 transition-all duration-500 min-h-[200px]"
          >
            <div className="flex justify-between items-start">
              
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-green-500/20 group-hover:border-green-500/50 transition-colors duration-500">
                <GithubIcon className="w-5 h-5 text-white/50 group-hover:text-green-400 transition-colors" />
              </div>
              
              <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-green-400 transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
            
            <div className="flex flex-col mt-8">
              <span className="font-mono text-[10px] text-white/40 tracking-[0.2em] uppercase mb-1">
                Source_Architecture
              </span>
              
              <span className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                GitHub
              </span>
            </div>
          </a>

        </div>
      </motion.div>
    </section>
  );
}