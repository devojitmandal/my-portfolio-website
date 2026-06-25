"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  ChevronDown, 
  CheckCircle2, 
  Rocket, 
  ChevronLeft, 
  ChevronRight,
  Cpu,
  Cloud,
  Terminal, 
  ShieldCheck, 
  Globe, 
  Database, 
  Layout,
  X
} from 'lucide-react';
import Image from "next/image";

interface ProjectTag { label: string; style: string; }
interface ProjectData {
  id: string; name: string; shortDescription: string; fullDescription: string;
  workCompleted: string[]; futurePlans: string; tags: ProjectTag[];
  images: string[]; githubUrl: string; icon: any;
}

const projects: ProjectData[] = [
  { id: '01', name: 'Advanced Biometric Watch v3.0', shortDescription: 'Custom C firmware processing raw physiological sensor data at the edge.', fullDescription: 'An embedded systems project built on the ESP32-C3 microcontroller. It bypasses heavy cloud computing by calculating physiological stress metrics in real-time directly on the hardware, requiring highly optimized memory management.', workCompleted: ['Firmware written in bare-metal C', 'Real-time data processing algorithms', 'ESP32-C3 hardware integration'], futurePlans: 'Design custom PCB and develop a companion BLE React Native app.', tags: [{ label: 'Hardware', style: 'bg-amber-500/10 text-amber-500 border-amber-500/20' }, { label: 'ESP32-C3', style: 'bg-amber-500/10 text-amber-500 border-amber-500/20' }], images: ["/projects/Advanced-Biometric-Watch-v3.0.png", "/projects/Advanced-Biometric-Watch-v3.0-2.png"], githubUrl: 'https://github.com/devojitmandal/Advanced-Biometric-Watch-v3.0', icon: Cpu },
  { id: '02', name: 'Student Management System', shortDescription: 'Bare-metal C application implementing dynamic memory allocation.', fullDescription: 'A pure software engineering challenge to build a persistent database system entirely from scratch in C using low-level file I/O operations.', workCompleted: ['Dynamic memory allocation engine', 'Custom linked-list structures', 'Persistent storage I/O'], futurePlans: 'Implement binary search trees (BST) to optimize the query speed.', tags: [{ label: 'Software', style: 'bg-teal-500/10 text-teal-400 border-teal-500/20' }, { label: 'C', style: 'bg-teal-500/10 text-teal-400 border-teal-500/20' }], images: ["/projects/student-management.png", "/projects/student-management-2.png"], githubUrl: 'https://github.com/devojitmandal/Student-Management-System-in-C', icon: Database },
  { id: '03', name: 'Resilience Hub', shortDescription: 'Mental wellness web app focused on user resilience and resource access.', fullDescription: 'A full-stack mental wellness application. The entire architecture, user journey logic, UI, and backend flow were built in a single day using AI tools.', workCompleted: ['End-to-end prototype deployed', 'AI-driven UI/UX', 'Backend data flow established'], futurePlans: 'Migrate the authentication and database layer to Supabase.', tags: [{ label: 'Web App', style: 'bg-teal-500/10 text-teal-400 border-teal-500/20' }, { label: 'AI-assisted', style: 'bg-purple-500/10 text-purple-400 border-purple-500/20' }], images: ["/projects/Resilience-Hub-Homepage.png", "/projects/Resilience-Hub-Signup.png"], githubUrl: 'https://github.com/devojitmandal/resiliencehub', icon: Terminal },
  { id: '04', name: 'IoT Vital Signs Monitor', shortDescription: 'Patient monitoring system built in C, simulating live hardware alerts.', fullDescription: 'Simulated patient monitoring system in C on ESP32. Validated entirely in Wokwi before physical deployment.', workCompleted: ['Wokwi simulation operational', 'ADC sensor reading', 'Alert system built'], futurePlans: 'Integrate real MAX30102 pulse oximeter sensors.', tags: [{ label: 'ESP32', style: 'bg-amber-500/10 text-amber-500 border-amber-500/20' }, { label: 'Wokwi', style: 'bg-teal-500/10 text-teal-400 border-teal-500/20' }], images: ["/projects/iot-vital-signs-monitor.png", "/projects/iot-vital-signs-monitor-2.png"], githubUrl: 'https://github.com/devojitmandal/iot-vital-signs-monitor', icon: ShieldCheck },
  { id: '05', name: 'Personal System Architecture', shortDescription: 'Interactive hardware-themed web portfolio.', fullDescription: 'A highly interactive web portfolio built from scratch using React, Next.js, and Framer Motion.', workCompleted: ['Procedural SVG fracture physics', 'Scroll-bound timeline', 'Bash terminal interface'], futurePlans: 'Optimize mobile responsive physics.', tags: [{ label: 'Next.js', style: 'bg-white/10 text-white border-white/20' }, { label: 'Framer', style: 'bg-purple-500/10 text-purple-400 border-purple-500/20' }], images: ["/projects/Personal-System-Architecture.png", "/projects/Personal-System-Architecture-2.png"], githubUrl: 'https://github.com/devojitmandal/my-portfolio-website', icon: Globe }
];

const ProjectAccordion = ({ project, isExpanded, setSelectedImage }: { project: ProjectData, isExpanded: boolean, setSelectedImage: (img: string) => void }) => (
  <AnimatePresence>
    {isExpanded && (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="pt-8 mt-6 border-t border-white/10">
          <p className="text-[#888] text-sm leading-relaxed mb-8">{project.fullDescription}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="text-[10px] text-teal-500 mb-4 flex items-center gap-2"><CheckCircle2 size={12}/> WORK_COMPLETED</div>
              <ul className="space-y-2">
                {project.workCompleted.map((item, i) => (
                  <li key={i} className="text-xs text-white/60 flex items-start gap-2">
                    <span className="text-teal-500/50">›</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-[10px] text-amber-500 mb-4 flex items-center gap-2"><Rocket size={12}/> ROADMAP</div>
              <p className="text-xs text-white/60 leading-relaxed">{project.futurePlans}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {project.images.map((img, i) => (
              <div 
                key={i} 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(img);
                }}
                className="relative h-32 rounded border border-white/10 overflow-hidden cursor-zoom-in group"
              >
                <Image 
                  src={img} 
                  alt="Project work" 
                  fill 
                  className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" 
                />
              </div>
            ))}
          </div>

          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" 
             className="inline-flex items-center gap-2 text-xs font-mono text-teal-400 hover:text-white transition-colors">
            VIEW_SOURCE <ArrowUpRight size={12}/>
          </a>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export function SelectedWork() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const scrollLock = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const changeIndex = (newIndex: number) => {
    setIsExpanded(false);
    setActiveIndex(newIndex);
  };

  const lockScroll = () => {
    scrollLock.current = true;
    setTimeout(() => { scrollLock.current = false; }, 600); 
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleNativeWheel = (e: WheelEvent) => {
      // THE FIX: Added `isExpanded` to this bypass rule!
      // If modal is open, on mobile, OR if the card is expanded, let the page scroll normally.
      if (selectedImage || window.innerWidth < 768 || isExpanded) return; 

      const isAtStart = activeIndex === 0 && e.deltaY < 0;
      const isAtEnd = activeIndex === projects.length - 1 && e.deltaY > 0;

      if (isAtStart || isAtEnd) return; 

      e.preventDefault();

      if (scrollLock.current) return;

      if (Math.abs(e.deltaY) > 30) {
        if (e.deltaY > 0) {
          changeIndex(activeIndex + 1);
          lockScroll();
        } else if (e.deltaY < 0) {
          changeIndex(activeIndex - 1);
          lockScroll();
        }
      }
    };

    container.addEventListener("wheel", handleNativeWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleNativeWheel);
    
    // THE FIX: Make sure to add `isExpanded` to the dependency array so the hook updates when you click!
  }, [activeIndex, selectedImage, isExpanded]); 


  return (
    <section id="work" className="w-full py-24 relative z-30 bg-transparent overflow-hidden">
      
      <div className="flex justify-between items-baseline mb-20 w-full max-w-5xl mx-auto px-6">
        <div className="text-[11px] font-mono text-[#888] tracking-[0.14em] flex items-center gap-2">
            <Layout className="w-3 h-3" /> // SELECTED_ARCHIVE
        </div>
        <div className="flex gap-4">
            <button onClick={() => changeIndex(Math.max(0, activeIndex - 1))} className="text-white/50 hover:text-teal-400 transition-colors">
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={() => changeIndex(Math.min(projects.length - 1, activeIndex + 1))} className="text-white/50 hover:text-teal-400 transition-colors">
                <ChevronRight className="w-6 h-6" />
            </button>
        </div>
      </div>

      <motion.div 
        ref={containerRef}
        animate={{ height: isExpanded ? 900 : 320 }}
        transition={{ type: "spring", stiffness: 150, damping: 30 }}
        className="relative w-full flex justify-center [perspective:1200px]"
      >
        {projects.map((project, index) => {
          const offset = index - activeIndex;
          const isActive = index === activeIndex;

          return (
            <motion.div
              key={project.id}
              onClick={() => { if (isActive) setIsExpanded(!isExpanded); else changeIndex(index); }}
              layout 
              className={`absolute top-0 w-[85%] md:w-[450px] bg-black/40 backdrop-blur-xl border rounded-xl p-8 shadow-2xl cursor-pointer transition-colors duration-500 ${
                isActive ? 'border-teal-500/50 z-50' : 'border-white/5 hover:border-white/20 z-0'
              }`}
              animate={{
                x: offset * 40,
                z: -Math.abs(offset) * 150,
                rotateY: offset * -15,
                scale: isActive ? 1 : 0.8,
                opacity: isActive ? 1 : 0.3,
                filter: isActive ? "blur(0px)" : "blur(4px)",
              }}
              transition={{ type: "spring", stiffness: 150, damping: 30 }}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <project.icon className={`w-5 h-5 ${isActive ? 'text-teal-400' : 'text-white/30'}`} />
                    <span className="text-[10px] font-mono text-white/40">{project.id}</span>
                  </div>
                  <h3 className={`text-2xl font-bold transition-colors ${isActive ? 'text-white' : 'text-white/50'}`}>
                    {project.name}
                  </h3>
                </div>
                
                {isActive && (
                   <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                     <ChevronDown className="text-white/30" />
                   </motion.div>
                )}
              </div>

              <p className="text-[#888] text-sm leading-relaxed mb-6">{project.shortDescription}</p>

              <div className="flex gap-2 mb-4">
                {project.tags.map((tag, i) => (
                  <span key={i} className={`text-[9px] font-mono px-2 py-1 border rounded ${tag.style}`}>
                    {tag.label}
                  </span>
                ))}
              </div>

              <ProjectAccordion 
                project={project} 
                isExpanded={isActive && isExpanded} 
                setSelectedImage={setSelectedImage} 
              />
              
            </motion.div>
          );
        })}
      </motion.div>
      
      <div className="flex justify-center items-center gap-6 mt-12 relative z-50">
        {projects.map((_, i) => {
          const isActive = i === activeIndex;
          
          return (
            <button 
                key={i} 
                onClick={() => changeIndex(i)}
                className={`font-mono text-sm transition-all duration-300 ${
                  isActive 
                    ? 'text-teal-400 scale-150 font-bold drop-shadow-[0_0_12px_rgba(45,212,191,0.8)]' 
                    : 'text-white/30 hover:text-white/70 hover:scale-110'
                }`} 
            >
              0{i + 1}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 backdrop-blur-md cursor-zoom-out p-4 md:p-12"
          >
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 md:top-12 md:right-12 text-white/50 hover:text-white transition-colors z-50"
            >
              <X className="w-8 h-8" />
            </button>

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-[90vw] h-[80vh] md:max-w-6xl rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] cursor-default"
            >
              <Image 
                src={selectedImage} 
                alt="Enlarged view" 
                fill 
                className="object-contain" 
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </section>
  );
}