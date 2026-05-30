"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, TerminalSquare, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

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
  const [terminalInput, setTerminalInput] = useState("");
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [transmissionComplete, setTransmissionComplete] = useState(false);
  
  const terminalEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // ONLY trigger the scroll if a transmission is actively happening or just finished.
    // This stops it from firing on initial page load.
    if ((isTransmitting || transmissionComplete) && terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isTransmitting, transmissionComplete]);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;
    
    setIsTransmitting(true);
    
    setTimeout(() => {
      setIsTransmitting(false);
      setTransmissionComplete(true);
      setTerminalInput("");
      
      setTimeout(() => {
        setTransmissionComplete(false);
      }, 5000);
    }, 2500);
  };

  return (
    <section id="contact" className="relative w-full py-24 z-10 border-t border-white/5">
      
      {/* ANIMATED SECTION HEADER */}
      <div className="mb-16 flex items-center gap-4">
        <motion.span 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="font-mono text-[11px] text-teal-500 tracking-[0.3em] uppercase whitespace-nowrap"
        >
          // SECURE_COMMUNICATIONS
        </motion.span>
        
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex-grow h-[1px] bg-gradient-to-r from-teal-500/50 via-teal-500/10 to-transparent origin-left"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        {/* THE TERMINAL CONSOLE */}
        <div className="rounded border border-white/10 bg-[#050505] overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] relative">
          
          <div className="absolute top-2 left-2 w-1 h-1 rounded-full bg-white/20 shadow-[inset_0_1px_1px_rgba(0,0,0,1)] z-10"></div>
          <div className="absolute top-2 right-2 w-1 h-1 rounded-full bg-white/20 shadow-[inset_0_1px_1px_rgba(0,0,0,1)] z-10"></div>
          <div className="absolute bottom-2 left-2 w-1 h-1 rounded-full bg-white/20 shadow-[inset_0_1px_1px_rgba(0,0,0,1)] z-10"></div>
          <div className="absolute bottom-2 right-2 w-1 h-1 rounded-full bg-white/20 shadow-[inset_0_1px_1px_rgba(0,0,0,1)] z-10"></div>

          <div className="flex items-center px-4 py-2 bg-white/[0.02] border-b border-white/5">
            <div className="flex gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
            </div>
            <div className="mx-auto font-mono text-[10px] text-white/30 uppercase tracking-widest flex items-center gap-2">
              <TerminalSquare className="w-3 h-3" />
              bash — sys_admin@blr_node
            </div>
          </div>

          <div className="p-6 md:p-8 flex flex-col gap-8 max-h-[500px] overflow-y-auto scrollbar-hide">
            
            <div className="font-mono text-xs md:text-sm space-y-2">
              <div className="flex items-center gap-2 text-white/70">
                <span className="text-teal-500">root@sys</span>:~$ ping -c 3 devojit.mandal
              </div>
              <div className="text-white/40 pl-4 space-y-1">
                <div>PING devojit.mandal (BLR_INDIA): 56 data bytes</div>
                <div>64 bytes from 1AY25EC045: icmp_seq=0 ttl=119 time=12.0 ms</div>
                <div>64 bytes from 1AY25EC045: icmp_seq=1 ttl=119 time=11.8 ms</div>
                <div>64 bytes from 1AY25EC045: icmp_seq=2 ttl=119 time=12.1 ms</div>
                <div className="text-teal-500/70 pt-2">--- devojit.mandal ping statistics ---</div>
                <div className="text-teal-500/70">3 packets transmitted, 3 packets received, 0.0% packet loss</div>
              </div>
            </div>

            <div className="font-mono text-xs md:text-sm space-y-2">
              <div className="flex items-center gap-2 text-white/70">
                <span className="text-teal-500">root@sys</span>:~$ list_external_nodes
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <a 
                  href="https://www.linkedin.com/in/devojit-mandal/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center p-4 border border-white/10 bg-white/[0.02] hover:bg-blue-500/10 hover:border-blue-500/30 transition-all duration-300 rounded-sm"
                >
                  {/* USING THE NEW LINKEDIN SVG */}
                  <LinkedinIcon className="w-5 h-5 text-white/40 group-hover:text-blue-400 mr-4 transition-colors" />
                  <div className="flex flex-col flex-grow">
                    <span className="font-mono text-xs text-white/70 group-hover:text-blue-400 uppercase tracking-widest transition-colors">LinkedIn_Network</span>
                    <span className="font-mono text-[9px] text-white/30">ESTABLISH_CONNECTION</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                </a>

                <a 
                  href="https://github.com/devojitmandal" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center p-4 border border-white/10 bg-white/[0.02] hover:bg-white/10 hover:border-white/30 transition-all duration-300 rounded-sm"
                >
                  {/* USING THE NEW GITHUB SVG */}
                  <GithubIcon className="w-5 h-5 text-white/40 group-hover:text-white mr-4 transition-colors" />
                  <div className="flex flex-col flex-grow">
                    <span className="font-mono text-xs text-white/70 group-hover:text-white uppercase tracking-widest transition-colors">Source_Repository</span>
                    <span className="font-mono text-[9px] text-white/30">VIEW_ARCHITECTURE</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            <div className="font-mono text-xs md:text-sm space-y-4 pt-4 border-t border-white/5">
              <div className="flex items-center gap-2 text-white/70">
                <span className="text-teal-500">root@sys</span>:~$ init_direct_message
              </div>
              
              <div className="text-white/40 pl-4">
                &gt; Secure channel opened. Enter payload below.
              </div>

              <form onSubmit={handleTerminalSubmit} className="relative mt-2">
                <div className="flex items-start bg-black/40 border border-white/10 rounded-sm p-4 shadow-[inset_0_0_15px_rgba(0,0,0,1)] focus-within:border-teal-500/50 transition-colors">
                  <span className="text-teal-500 mr-3 mt-1 font-bold">&gt;</span>
                  <textarea 
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    placeholder="Type message here..."
                    disabled={isTransmitting || transmissionComplete}
                    className="w-full bg-transparent border-none outline-none text-white/80 placeholder:text-white/20 resize-none font-mono text-sm min-h-[80px]"
                  />
                </div>

                <div className="flex justify-end mt-4">
                  <button 
                    type="submit"
                    disabled={!terminalInput.trim() || isTransmitting || transmissionComplete}
                    className="group relative flex items-center gap-2 px-6 py-2 bg-white/5 hover:bg-teal-500 border border-white/10 hover:border-teal-400 text-white/50 hover:text-black font-mono text-xs font-bold uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed rounded-sm"
                  >
                    Transmit_Payload
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>

              <AnimatePresence>
                {isTransmitting && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pl-4 space-y-2 pt-2 text-amber-500/80 font-mono text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      Encrypting payload...
                    </div>
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      transition={{ delay: 1 }}
                      className="flex items-center gap-2"
                    >
                      <Loader2 className="w-3 h-3 animate-spin" />
                      Routing to BLR_INDIA servers...
                    </motion.div>
                  </motion.div>
                )}

                {transmissionComplete && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pl-4 space-y-2 pt-2 text-teal-400 font-mono text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3" />
                      Transmission successful. System administrator notified.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div ref={terminalEndRef} />
            </div>

          </div>
        </div>
      </motion.div>
    </section>
  );
}