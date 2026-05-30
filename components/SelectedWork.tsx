"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronDown, CheckCircle2, Rocket, ImageIcon } from 'lucide-react';
import Image from "next/image";

const projects = [
  {
    id: '01',
    name: 'Advanced Biometric Watch v3.0',
    shortDescription: 'Custom C firmware processing raw physiological sensor data directly at the edge.',
    fullDescription: 'An embedded systems project built on the ESP32-C3 microcontroller. It bypasses heavy cloud computing by calculating physiological stress metrics in real-time directly on the hardware, requiring highly optimized memory management.',
    workCompleted: [
      'Firmware written in bare-metal C',
      'Real-time data processing algorithms implemented',
      'ESP32-C3 hardware integration verified'
    ],
    futurePlans: 'Design a custom PCB to shrink the physical footprint and write a companion React Native app via Bluetooth Low Energy (BLE).',
    tags: [
      { label: 'Hardware', style: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
      { label: 'ESP32-C3', style: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
      { label: 'C', style: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
    ],
    images: [
      "/projects/Advanced-Biometric-Watch-v3.0.png",
      "/projects/Advanced-Biometric-Watch-v3.0-2.png",
    ]
  },
  {
    id: '02',
    name: 'Student Management System',
    shortDescription: 'Bare-metal C application implementing dynamic memory allocation and custom data structures.',
    fullDescription: 'A pure software engineering challenge to build a persistent database system entirely from scratch in C. It uses low-level file I/O operations and advanced pointer arithmetic to manage memory without relying on modern database abstractions.',
    workCompleted: [
      'Dynamic memory allocation engine (malloc/free)',
      'Custom linked-list data structures',
      'Persistent file I/O storage system'
    ],
    futurePlans: 'Implement binary search trees (BST) to optimize the query speed for thousands of student records.',
    tags: [
      { label: 'Software', style: 'bg-teal-500/10 text-teal-400 border-teal-500/20' },
      { label: 'C', style: 'bg-teal-500/10 text-teal-400 border-teal-500/20' },
      { label: 'CLI', style: 'bg-gray-500/10 text-gray-400 border-gray-500/20' },
    ],
    images: [
      "/projects/student-management.png",
      "/projects/student-management-2.png",
    ]
  },
  {
    id: '03',
    name: 'Resilience Hub',
    shortDescription: 'Mental wellness web app focused on user resilience and resource access.',
    fullDescription: 'A full-stack mental wellness application. The entire architecture, user journey logic, UI, and backend flow were built in a single day using AI tools. It serves as a proof-of-concept for how fast AI-assisted development can go from idea to deployment.',
    workCompleted: [
      'End-to-end prototype deployed',
      'AI-driven UI/UX generation',
      'Backend data flow established'
    ],
    futurePlans: 'Migrate the authentication and database layer to Supabase for robust user state management.',
    tags: [
      { label: 'Web App', style: 'bg-teal-500/10 text-teal-400 border-teal-500/20' },
      { label: 'AI-assisted', style: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
    ],
    images: [
      "/projects/Resilience-Hub-Homepage.png",
      "/projects/Resilience-Hub-Signup.png",
    ]
  },
  {
    id: '04',
    name: 'IoT Vital Signs Monitor',
    shortDescription: 'Patient monitoring system built in C, simulating live hardware alerts.',
    fullDescription: 'Simulated patient monitoring system in C on ESP32. Potentiometer-driven analog signals mimic real sensor data, with conditional logic triggering live alerts. Validated entirely in Wokwi before physical deployment.',
    workCompleted: [
      'Wokwi simulation fully operational',
      'ADC sensor reading and mapping complete',
      'Threshold-based LED/Buzzer alert system built'
    ],
    futurePlans: 'Integrate real MAX30102 pulse oximeter sensors and push telemetry data to a live cloud dashboard.',
    tags: [
      { label: 'ESP32', style: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
      { label: 'Wokwi', style: 'bg-teal-500/10 text-teal-400 border-teal-500/20' },
    ],
    images: [
      "/projects/iot-vital-signs-monitor.png",
      "/projects/iot-vital-signs-monitor-2.png",
    ]
    
  },
  {
    id: '05',
    name: 'Personal System Architecture',
    shortDescription: 'Interactive hardware-themed web portfolio built with React and Framer Motion.',
    fullDescription: 'A highly interactive web portfolio built from scratch using React, Next.js, Tailwind CSS, and Framer Motion. It features procedural physics engines for SVG shattering, scroll-linked data telemetry animations, and a secure mock bash terminal for contact.',
    workCompleted: [
      'Engineered procedural SVG fracture physics',
      'Built scroll-bound timeline animations',
      'Developed interactive Bash terminal interface'
    ],
    futurePlans: 'Deploy to Vercel, integrate Formspree for live terminal messaging, and optimize mobile responsive physics.',
    tags: [
      { label: 'Next.js', style: 'bg-white/10 text-white border-white/20' },
      { label: 'Framer', style: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
      { label: 'React', style: 'bg-teal-500/10 text-teal-400 border-teal-500/20' },
    ],
    images: [
      "/projects/Personal-System-Architecture.png",
      "/projects/Personal-System-Architecture-2.png",
    ]
  },
];

export function SelectedWork() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="work" className="w-full py-20 border-t-[0.5px] border-white/10 relative z-30 bg-transparent">
      
      {/* Section Header */}
      <div className="flex justify-between items-baseline mb-10 w-full">
        <div className="text-[11px] font-mono text-[#888] tracking-[0.14em]">
          // SELECTED WORK
        </div>
        <div className="text-[11px] font-mono text-white/30">
        0{projects.length} projects
        </div>
      </div>

      {/* Projects Grid */}
      {/* Added perspective to the parent so the 3D hinge effect works */}
      <div 
      className="grid grid-cols-1 gap-[1px] bg-white/10 border-[0.5px] border-white/10 rounded-xl overflow-hidden w-full"
      style={{ perspective: "1000px" }}
      >
      {projects.map((project, index) => { // Make sure to pass 'index' here!
        const isExpanded = expandedId === project.id;

          return (
            <motion.div 
              key={project.id}
              onClick={() => setExpandedId(isExpanded ? null : project.id)}
              // 1. THE SERVER BLADE HINGE PHYSICS
              initial={{ opacity: 0, rotateX: -45, y: -20, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                delay: index * 0.15, // Staggers them perfectly down the list
                type: "spring", 
                stiffness: 120, 
                damping: 14,
                mass: 1.2
              }}
              style={{ transformOrigin: "top" }} // Forces the box to swing down from its top edge
              className="group relative bg-[#0a0a0a] p-6 sm:p-8 cursor-pointer transition-colors duration-300 hover:bg-white/[0.02] overflow-hidden"
            >
              
              {/* 2. THE INITIALIZATION LASER SWEEP */}
              <motion.div
                initial={{ left: "-10%" }}
                whileInView={{ left: "110%" }}
                viewport={{ once: true }}
                // Triggers exactly as the spring bounce settles
                transition={{ duration: 0.6, delay: index * 0.15 + 0.3, ease: "linear" }}
                className="absolute top-0 bottom-0 w-[2px] bg-teal-400 shadow-[0_0_20px_#2dd4bf] z-50 pointer-events-none mix-blend-screen"
              />

              {/* TOP ROW: ID & Tags */}
              <div className="relative z-10 flex justify-between items-start mb-4">
                <div className="text-[11px] font-mono text-white/30 pt-1">
                  {project.id} &mdash;
                </div>
                <div className="flex gap-2 flex-wrap justify-end max-w-[75%]">
                  {project.tags.map((tag, i) => (
                    <motion.span 
                    key={i} 
                    // 1. THE FLICKER BOOT SEQUENCE
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ 
                      opacity: [0, 1, 0.2, 1], // Rapid electrical flicker
                      scale: 1 
                    }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      duration: 0.4,
                      // 2. THE TIMING MATH: Waits for the card to drop (index * 0.15) + waits for the laser (0.4) + staggers each tag (i * 0.1)
                      delay: (index * 0.15) + 0.4 + (i * 0.1), 
                      times: [0, 0.4, 0.6, 1],
                      ease: "easeInOut"
                    }}
                    className={`text-[10px] font-mono px-2 py-1 border-[0.5px] rounded tracking-[0.06em] cursor-default shadow-[0_0_1px_currentColor,inset_0_0_2px_currentColor] [text-shadow:0_0_2px_currentColor] ${tag.style}`}
                  >
                    {tag.label}
                  </motion.span>
                  ))}
                </div>
              </div>

              {/* ALWAYS VISIBLE CONTENT */}
              <div className="relative z-10 flex justify-between items-end">
                <div className="max-w-[85%]">
                  <h3 className="text-xl font-semibold tracking-tight text-[#fafaf8] mb-2 group-hover:text-teal-400 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-[14px] text-[#888] leading-relaxed">
                    {project.shortDescription}
                  </p>
                </div>
                
                {/* Expand Icon */}
                <div className="text-white/20 transition-all duration-300 group-hover:text-teal-400">
                  <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </div>
              </div>

              {/* EXPANDABLE DEEP DIVE SECTION */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden relative z-10"
                  >
                    <div className="pt-8 mt-6 border-t-[0.5px] border-white/10">
                      
                      {/* Full Description */}
                      <p className="text-[14px] text-[#fafaf8] leading-relaxed mb-8">
                        {project.fullDescription}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        {/* Status / Work Done */}
                        <div>
                          <div className="text-[10px] font-mono text-[#888] tracking-[0.14em] mb-4 flex items-center gap-2">
                            <CheckCircle2 className="w-3 h-3 text-teal-500" /> STATUS
                          </div>
                          <ul className="space-y-3">
                            {project.workCompleted.map((item, i) => (
                              <li key={i} className="text-[13px] text-[#888] flex items-start gap-2">
                                <span className="text-white/20 mt-[2px]">-</span> {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Future Roadmap */}
                        <div>
                          <div className="text-[10px] font-mono text-[#888] tracking-[0.14em] mb-4 flex items-center gap-2">
                            <Rocket className="w-3 h-3 text-amber-500" /> ROADMAP
                          </div>
                          <p className="text-[13px] text-[#888] leading-relaxed">
                            {project.futurePlans}
                          </p>
                        </div>
                      </div>

                      {/* Image Gallery Placeholders */}
                      <div className="text-[10px] font-mono text-[#888] tracking-[0.14em] mb-4 flex items-center gap-2">
                        <ImageIcon className="w-3 h-3 text-purple-500" /> PROOF OF WORK
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        {/* Image 1 */}
                        <div className="relative w-full h-64 overflow-hidden rounded-md border-[0.5px] border-white/10">
                          <Image 
                            src={project.images[0]}
                            alt={`Screenshot of ${project.name}`}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        
                        {/* Image 2 */}
                        <div className="relative w-full h-64 overflow-hidden rounded-md border-[0.5px] border-white/10">
                          <Image 
                            src={project.images[1]}
                            alt={`Screenshot of ${project.name} (alternate view)`}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      </div>

                      {/* View Source Button */}
                      <div className="mt-8 flex justify-end">
                        <button className="flex items-center gap-2 text-[12px] font-medium text-[#fafaf8] bg-white/5 px-4 py-2 rounded border-[0.5px] border-white/10 transition-colors hover:bg-white/10">
                          View Code <ArrowUpRight className="w-3 h-3" />
                        </button>
                      </div>

                    </div>
                  </ motion.div>
                )}
              </AnimatePresence>

            </ motion.div>
          );
        })}

      </div>
    </section>
  );
}