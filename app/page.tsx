import { UfoGame3D } from "@/components/UfoGame3D";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { SelectedWork } from "@/components/SelectedWork";
import { AmbientStarfield } from "@/components/hero/AmbientStarfield";
import { PassingStar } from "@/components/hero/PassingStar";
import { DataStreamRibbon } from "@/components/DataStreamRibbon"; 
import { AboutSection } from "@/components/AboutSection";
import { StackSection } from "@/components/StackSection";
import { TimelineSection } from "@/components/TimelineSection";
import { ContactSection } from "@/components/ContactSection";
export default function Home() {
  return (

    <main className="relative flex flex-col items-center overflow-x-hidden min-h-screen">
      
      {/* FULL-SCREEN CINEMATIC BACKGROUNDS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <AmbientStarfield />
      </div>

      {/* CENTERED 680px CONTENT COLUMN (Hero) */}
      <div className="max-w-[680px] mx-auto px-6 relative z-10">
        <Navbar />
        <HeroSection />
      </div>

      {/* FULL WIDTH DATA STREAM SEPARATOR */}
      {/* 2. Drop it outside the 680px div so it spans the whole monitor! */}
      <div className="w-full relative z-10">
        <DataStreamRibbon />
      </div>

      {/* CENTERED 680px CONTENT COLUMN (Work) */}
      {/* 3. Wrap SelectedWork in its own 680px container so it stays perfectly aligned */}
      <div className="max-w-[680px] mx-auto px-6 relative z-10">
        <SelectedWork />
        <AboutSection />
        <StackSection />
        <TimelineSection />
        <ContactSection />
      </div>
      {/* THE GLOBAL SYSTEM FOOTER */}
      <footer className="w-full relative z-10 border-t border-white/5 mt-20 py-12 flex flex-col items-center justify-center gap-4 bg-black/20 backdrop-blur-sm">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-teal-500/60 flex items-center gap-3">
          <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
          YES, AI HELPED BUILD THIS SITE. THAT'S THE POINT.
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/20 flex gap-6">
          <span>DEVOJIT MANDAL © 2026</span>
          <span>SYS_ARCH_BLR</span>
        </div>
      </footer>
      <UfoGame3D />
    </main>
  );
}