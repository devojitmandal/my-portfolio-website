import { UfoGame3D } from "@/components/UfoGame3D";
import { RoboNav } from "@/components/RoboNav";
import { HeroSection } from "@/components/hero/HeroSection";
import { SelectedWork } from "@/components/SelectedWork";
import { AmbientStarfield } from "@/components/hero/AmbientStarfield";
import { AboutSection } from "@/components/AboutSection";
import { StackSection } from "@/components/StackSection";
import { TimelineSection } from "@/components/TimelineSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="relative flex flex-col items-center overflow-x-hidden min-h-screen bg-[#050505]">
      
      {/* 1. BACKGROUND LAYER */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <AmbientStarfield />
      </div>

      {/* 2. THE CINEMATIC & WIDE-SCREEN LAYER (Hero + SelectedWork) */}
      {/* We keep these outside the 680px constraint to allow for full-bleed interactions */}
      <div className="w-full relative z-10">
      <RoboNav />
        <div className="max-w-[680px] mx-auto px-6">
          <HeroSection />
        </div>
        
        {/* SelectedWork takes the full width of the screen */}
        <SelectedWork />
      </div>

      {/* 3. THE TEXT-HEAVY CONTENT LAYER (About, Stack, Timeline, Contact) */}
      <div className="max-w-[680px] w-full mx-auto px-6 relative z-0 py-16">
        <AboutSection />
        <StackSection />
        

      </div>
      <div className="w-full relative z-0">
      <TimelineSection />

      <ContactSection />
      
      {/* The Footer is now its own component! */}
      <Footer />
      </div>
      
      <UfoGame3D />
    </main>
  );
}